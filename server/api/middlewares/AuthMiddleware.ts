import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import moment from 'moment';
import path from 'path';
import dotenv from 'dotenv';

import HttpResponseCode from '../../helpers/HttpsResponse';
import ApiError from '../../utils/ApiError';

import { AccessTokenAttributes, UserAttributes } from '../../interface/models';
import db from '../../database';
dotenv.config({ path: path.resolve('../../../.env') });

class AuthMiddleWare {
  public async verifyToken(req: Request, res: Response, next: NextFunction) {
    try {
      //  1) Getting token and check of it's there
      let token: string | undefined;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        token = req.headers.authorization.split(' ')[1];
      }

      // check is token is present in header
      if (!token) {
        return next(
          new ApiError(
            'you do not have a session id',
            HttpResponseCode.HTTP_UNAUTHORIZED,
            { message: 'session  is invalid' },
          ),
        );
      }

      // check for token
      const jwtToken = await db<AccessTokenAttributes>('access_tokens')
        .where('token', token)
        .first();

      if (!jwtToken) {
        return next(
          new ApiError(
            'Unauthorized access',
            HttpResponseCode.HTTP_UNAUTHORIZED,
            {
              message: 'Unauthorized Access Please log in',
            },
          ),
        );
      }

      const expiredAt = moment(jwtToken?.expires_at_ms);
      const currentDate = moment();
      if (currentDate.isAfter(expiredAt)) {
        await db<AccessTokenAttributes>('access_tokens')
          .where({ id: jwtToken.id })
          .del();

        return next(
          new ApiError(
            'session has expired please log in again',
            HttpResponseCode.HTTP_UNAUTHORIZED,
            {
              message: 'Session has expired',
            },
          ),
        );
      }

      // 2) docode token
      const decoded = jwt.verify(
        token,
        (<any>process.env).APP_KEY,
      ) as JwtPayload;

      // 2) Verification token
      const user = await db<UserAttributes>('users')
        .where({ email: decoded.email })
        .first();

      // check if user exists
      if (!user) {
        return next(
          new ApiError(
            'data invalid as user does not exist',
            HttpResponseCode.HTTP_UNAUTHORIZED,
            { message: 'try logging in or contact support' },
          ),
        );
      }

      (<any>req).user = user;

      return next();
    } catch (error: any) {
      if (error.name === 'JsonWebTokenError') {
        error = await handleJWTError(req, error);
      }
      if (error.name === 'TokenExpiredError') {
        error = await handleJWTExpiredError(req, error);
      }
      return next(error);
    }
  }
}

const handleJWTError = async (req: Request, err: any) => {
  const token = (<any>req.headers.authorization).split(' ')[1];
  if (token) {
    await db<AccessTokenAttributes>('access_tokens').where({ token }).del();
  }
  return new ApiError(
    'Invalid token. Please log in again!',
    HttpResponseCode.HTTP_UNAUTHORIZED,
    {},
  );
};

const handleJWTExpiredError = async (req: Request, err: any) => {
  const token = (<any>req.headers.authorization).split(' ')[1];
  if (token) {
    await db<AccessTokenAttributes>('access_tokens').where({ token }).del();
  }
  return new ApiError(
    'Your token has expired! Please log in again.',
    HttpResponseCode.HTTP_UNAUTHORIZED,
    {},
  );
};
export default new AuthMiddleWare();
