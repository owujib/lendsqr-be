import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';
import Controller from '.';

import Helper from '../../helpers';
import HttpStatusCode from '../../helpers/HttpsResponse';
import Validator from '../../helpers/Validator';

import ApiError from '../../utils/ApiError';
import AuthMail from '../../mail/Authmail';
import db from '../../database';
import { AccessTokenAttributes, UserAttributes } from '../../interface/models';
import AccountEvents from '../events/AccountEvents';
import User from '../../models/User';

class AuthController extends Controller {
  constructor() {
    super();
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = Validator.validateBody(req, {
        email: Joi.string().email().required(),
        fullname: Joi.string().required(),
        password: Joi.string().required().min(6).max(15),
      });

      if (error) {
        return next(Validator.RequestValidationError(error.message));
      }

      /**find one */
      // const findUser = await userModel.where('email', req.body.email).first();
      const findUser = await new User().findByEmail(req.body.email);

      if (findUser) {
        return next(
          new ApiError(
            'User details already exist',
            HttpStatusCode.HTTP_BAD_REQUEST,
            {
              message: 'Email is already taken',
            },
          ),
        );
      }
      /**create user */
      let [user_id] = await new User().create({
        ...req.body,
        password: Helper.hash(req.body.password, 10),
      });

      /**run account creation event */
      await AccountEvents.emit(AccountEvents.events.INIT_ACCOUNT, user_id);

      return super.sendSuccessResponse(
        res,
        { id: user_id, fullname: req.body.fullname, email: req.body.email },
        'Account has been created',
        HttpStatusCode.HTTP_CREATED,
      );
    } catch (error) {
      return next(error);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = Validator.validateBody(req, {
        email: Joi.string().email().required(),
        password: Joi.string().required().min(6).max(15),
      });

      if (error) {
        return next(Validator.RequestValidationError(error.message));
      }

      /**check if user exists */
      const user = await new User().findByEmail(req.body.email);
      if (!user) {
        return next(
          new ApiError('User does not exist', HttpStatusCode.HTTP_BAD_REQUEST, {
            message: 'Please create an account with the following details',
          }),
        );
      }

      /**check if passwords match */
      const comparePasswords = await Helper.correctPassword(
        req.body.password,
        user.password,
      );

      if (!comparePasswords) {
        return next(
          new ApiError(
            'User details does not match',
            HttpStatusCode.HTTP_BAD_REQUEST,
            {
              message: 'Could not verify email or password',
            },
          ),
        );
      }

      const token = await AuthController.createAccessToken(user);

      /** send success response */
      return super.sendSuccessResponse(
        res,
        {
          user: { email: user.email, id: user.id, fullname: user.fullname },
          access_token: token,
        },
        'Login successfull',
        HttpStatusCode.HTTP_OK,
      );
    } catch (error) {
      return next(error);
    }
  }

  static async createAccessToken(user: UserAttributes) {
    try {
      const { token } = Helper.signToken({ id: user?.id, email: user?.email });

      const date = Helper.addDays(new Date(), 7);

      await db<AccessTokenAttributes>('access_tokens').insert({
        token,
        user_id: user?.id,
        revoked: false,
        expires_at: date.toString(),
        expires_at_ms: date.getTime(),
      });
      return token;
    } catch (error) {
      Promise.reject(error);
    }
  }
}

export default new AuthController();
