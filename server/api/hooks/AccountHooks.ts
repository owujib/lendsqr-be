import db from '../../database';
import { WalletAttributes } from '../../interface/models';
import ApiError from '../../utils/ApiError';

class Account {
  async initAccount(user_id: number) {
    try {
      let wallet = db<WalletAttributes>('user_wallets');
      let haveWallet = await wallet.where({ user_id }).first();
      if (haveWallet) {
        console.log('user already have a wallet');
        return haveWallet;
      }
      let [account_id] = await wallet.insert({
        user_id,
        balance: 100_000,
      });

      return account_id;
    } catch (error) {
      throw error;
    }
  }
}

export default new Account();
