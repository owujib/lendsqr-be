"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../../database"));
class Account {
    initAccount(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let wallet = (0, database_1.default)('user_wallets');
                let haveWallet = yield wallet.where({ user_id }).first();
                if (haveWallet) {
                    console.log('user already have a wallet');
                    return haveWallet;
                }
                let [account_id] = yield wallet.insert({
                    user_id,
                    balance: 100000,
                });
                return account_id;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = new Account();
