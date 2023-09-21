"use strict";
// src/models/transaction.js
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
const HttpsResponse_1 = __importDefault(require("../helpers/HttpsResponse"));
const ApiError_1 = __importDefault(require("../utils/ApiError"));
const database_1 = __importDefault(require("../database"));
class UserWallets {
    constructor() {
        this.tableName = 'user_wallets'; // The name of the transactions table
    }
    create(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            return (0, database_1.default)(this.tableName).insert(payload);
        });
    }
    transfer(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    /**check sender's balance */
                    const senderBalance = yield (0, database_1.default)(this.tableName)
                        .transacting(trx)
                        .select('balance')
                        .where({ user_id: payload.user_id })
                        .first();
                    if (!senderBalance) {
                        throw new ApiError_1.default('An Error occured', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                            message: 'Could not find user account details',
                        });
                    }
                    if (senderBalance.balance < payload.amount) {
                        throw new Error('Insufficient balance');
                    }
                    /**update the balance of the sender*/
                    yield (0, database_1.default)(this.tableName)
                        .transacting(trx)
                        .where('id', payload.user_id)
                        .decrement('balance', payload.amount);
                    /**update the balance of the recipient */
                    yield (0, database_1.default)(this.tableName)
                        .transacting(trx)
                        .where('id', payload.recipientId)
                        .increment('balance', payload.amount);
                }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    withdraw(payload) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                    /**check for logged in user balance */
                    const userBalance = yield (0, database_1.default)(this.tableName)
                        .transacting(trx)
                        .select('balance')
                        .where('user_id', payload.user_id)
                        .first();
                    if (!userBalance) {
                        throw new ApiError_1.default('An error occurred', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                            message: 'Could not find user wallet',
                        });
                    }
                    if (userBalance.balance < payload.amount) {
                        throw new Error('Insufficient balance');
                    }
                    /**update user balance */
                    yield (0, database_1.default)(this.tableName)
                        .transacting(trx)
                        .where('id', payload.user_id)
                        .decrement('balance', payload.amount);
                }));
            }
            catch (error) {
                throw error;
            }
        });
    }
    fund(user_id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            yield database_1.default.transaction((trx) => __awaiter(this, void 0, void 0, function* () {
                // Check if the sender has sufficient balance
                const userBalance = yield (0, database_1.default)(this.tableName)
                    .transacting(trx)
                    .select('balance')
                    .where({ user_id })
                    .first();
                if (!userBalance) {
                    throw new ApiError_1.default('An Error occured', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                        message: 'Could not find user account details',
                    });
                }
                yield (0, database_1.default)('user_wallets')
                    .transacting(trx)
                    .where('user_id', user_id)
                    .increment('balance', Number(amount));
            }));
        });
    }
}
exports.default = UserWallets;
