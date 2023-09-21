import { Response, Request, NextFunction } from 'express';
import Joi from 'joi';

import Controller from '.';
import HttpStatusCode from '../../helpers/HttpsResponse';
import Validator from '../../helpers/Validator';
import { UserAttributes } from '../../interface/models';
import UserWallets from '../../models/UserWallet';

class WalletController extends Controller {
  constructor() {
    super();
  }

  public async transfer(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = Validator.validateBody(req, {
        recipient_id: Joi.number().required(),
        amount: Joi.number().required(),
      });

      let user: UserAttributes = (<any>req).user;

      if (error) {
        return next(Validator.RequestValidationError(error.message));
      }

      await new UserWallets().transfer({
        user_id: user?.id,
        amount: req.body.amount,
        recipientId: req.body.recipient_id,
      });

      return super.sendSuccessResponse(
        res,
        {
          user: { id: user.id, email: user.email },
        },
        'Wallet transfer successful',
        HttpStatusCode.HTTP_OK,
      );
    } catch (error) {
      return next(error);
    }
  }

  public async withdraw(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = Validator.validateBody(req, {
        amount: Joi.number().required(),
      });

      if (error) {
        return next(Validator.RequestValidationError(error.message));
      }

      const user: UserAttributes = (<any>req).user;

      await new UserWallets().withdraw({
        user_id: user.id,
        amount: req.body.amount,
      });

      return super.sendSuccessResponse(
        res,
        {
          user: { id: user.id, email: user.email },
          debit: req.body.amount,
        },
        'Withdrawal successful',
        HttpStatusCode.HTTP_OK,
      );
    } catch (error) {
      return next(error);
    }
  }

  public async topUp(req: Request, res: Response, next: NextFunction) {
    try {
      const { error } = Validator.validateBody(req, {
        amount: Joi.number().required(),
      });

      let user: UserAttributes = (<any>req).user;

      if (error) {
        return next(Validator.RequestValidationError(error.message));
      }

      await new UserWallets().fund(user.id, req.body.amount);

      return super.sendSuccessResponse(
        res,
        {
          user: {
            id: user.id,
            email: user.email,
          },
          amount: req.body.amount,
        },
        'Wallet top up successful',
        HttpStatusCode.HTTP_OK,
      );
    } catch (error) {
      return next(error);
    }
  }
}

export default new WalletController();
