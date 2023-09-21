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
const joi_1 = __importDefault(require("joi"));
const _1 = __importDefault(require("."));
const HttpsResponse_1 = __importDefault(require("../../helpers/HttpsResponse"));
const Validator_1 = __importDefault(require("../../helpers/Validator"));
const UserWallet_1 = __importDefault(require("../../models/UserWallet"));
class WalletController extends _1.default {
    constructor() {
        super();
    }
    transfer(req, res, next) {
        const _super = Object.create(null, {
            sendSuccessResponse: { get: () => super.sendSuccessResponse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validator_1.default.validateBody(req, {
                    recipient_id: joi_1.default.number().required(),
                    amount: joi_1.default.number().required(),
                });
                let user = req.user;
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.message));
                }
                yield new UserWallet_1.default().transfer({
                    user_id: user === null || user === void 0 ? void 0 : user.id,
                    amount: req.body.amount,
                    recipientId: req.body.recipient_id,
                });
                return _super.sendSuccessResponse.call(this, res, {
                    user: { id: user.id, email: user.email },
                }, 'Wallet transfer successful', HttpsResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    withdraw(req, res, next) {
        const _super = Object.create(null, {
            sendSuccessResponse: { get: () => super.sendSuccessResponse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validator_1.default.validateBody(req, {
                    amount: joi_1.default.number().required(),
                });
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.message));
                }
                const user = req.user;
                yield new UserWallet_1.default().withdraw({
                    user_id: user.id,
                    amount: req.body.amount,
                });
                return _super.sendSuccessResponse.call(this, res, {
                    user: { id: user.id, email: user.email },
                    debit: req.body.amount,
                }, 'Withdrawal successful', HttpsResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    topUp(req, res, next) {
        const _super = Object.create(null, {
            sendSuccessResponse: { get: () => super.sendSuccessResponse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validator_1.default.validateBody(req, {
                    amount: joi_1.default.number().required(),
                });
                let user = req.user;
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.message));
                }
                yield new UserWallet_1.default().fund(user.id, req.body.amount);
                return _super.sendSuccessResponse.call(this, res, {
                    user: {
                        id: user.id,
                        email: user.email,
                    },
                    amount: req.body.amount,
                }, 'Wallet top up successful', HttpsResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
    }
}
exports.default = new WalletController();
