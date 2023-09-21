// src/models/transaction.js

import HttpStatusCode from '../helpers/HttpsResponse';
import { WalletAttributes } from '../interface/models';
import ApiError from '../utils/ApiError';
import db from '../database';

class UserWallets {
  tableName: string;

  constructor() {
    this.tableName = 'user_wallets'; // The name of the transactions table
  }

  async create(payload: WalletAttributes) {
    return db<WalletAttributes>(this.tableName).insert(payload);
  }

  async transfer(payload: {
    user_id: number | undefined;
    recipientId: number;
    amount: number;
  }) {
    try {
      return db.transaction(async (trx) => {
        /**check sender's balance */
        const senderBalance = await db<WalletAttributes>(this.tableName)
          .transacting(trx)
          .select('balance')
          .where({ user_id: payload.user_id })
          .first();

        if (!senderBalance) {
          throw new ApiError(
            'An Error occured',
            HttpStatusCode.HTTP_BAD_REQUEST,
            {
              message: 'Could not find user account details',
            },
          );
        }

        if (senderBalance.balance < payload.amount) {
          throw new Error('Insufficient balance');
        }

        /**update the balance of the sender*/
        await db(this.tableName)
          .transacting(trx)
          .where('id', payload.user_id)
          .decrement('balance', payload.amount);

        /**update the balance of the recipient */
        await db(this.tableName)
          .transacting(trx)
          .where('id', payload.recipientId)
          .increment('balance', payload.amount);
      });
    } catch (error) {
      throw error;
    }
  }

  async withdraw(payload: { user_id: number | undefined; amount: number }) {
    try {
      return db.transaction(async (trx) => {
        /**check for logged in user balance */
        const userBalance = await db<WalletAttributes>(this.tableName)
          .transacting(trx)
          .select('balance')
          .where('user_id', payload.user_id)
          .first();

        if (!userBalance) {
          throw new ApiError(
            'An error occurred',
            HttpStatusCode.HTTP_BAD_REQUEST,
            {
              message: 'Could not find user wallet',
            },
          );
        }

        if (userBalance.balance < payload.amount) {
          throw new Error('Insufficient balance');
        }

        /**update user balance */
        await db(this.tableName)
          .transacting(trx)
          .where('id', payload.user_id)
          .decrement('balance', payload.amount);
      });
    } catch (error) {
      throw error;
    }
  }

  async fund(user_id: number | undefined, amount: string) {
    await db.transaction(async (trx) => {
      // Check if the sender has sufficient balance
      const userBalance = await db<WalletAttributes>(this.tableName)
        .transacting(trx)
        .select('balance')
        .where({ user_id })
        .first();

      if (!userBalance) {
        throw new ApiError(
          'An Error occured',
          HttpStatusCode.HTTP_BAD_REQUEST,
          {
            message: 'Could not find user account details',
          },
        );
      }

      await db('user_wallets')
        .transacting(trx)
        .where('user_id', user_id)
        .increment('balance', Number(amount));
    });
  }
}

export default UserWallets;
