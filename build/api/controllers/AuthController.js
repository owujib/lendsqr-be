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
const helpers_1 = __importDefault(require("../../helpers"));
const HttpsResponse_1 = __importDefault(require("../../helpers/HttpsResponse"));
const Validator_1 = __importDefault(require("../../helpers/Validator"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const database_1 = __importDefault(require("../../database"));
const AccountEvents_1 = __importDefault(require("../events/AccountEvents"));
const User_1 = __importDefault(require("../../models/User"));
class AuthController extends _1.default {
    constructor() {
        super();
    }
    register(req, res, next) {
        const _super = Object.create(null, {
            sendSuccessResponse: { get: () => super.sendSuccessResponse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validator_1.default.validateBody(req, {
                    email: joi_1.default.string().email().required(),
                    fullname: joi_1.default.string().required(),
                    password: joi_1.default.string().required().min(6).max(15),
                });
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.message));
                }
                /**find one */
                // const findUser = await userModel.where('email', req.body.email).first();
                const findUser = yield new User_1.default().findByEmail(req.body.email);
                if (findUser) {
                    return next(new ApiError_1.default('User details already exist', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                        message: 'Email is already taken',
                    }));
                }
                /**create user */
                let [user_id] = yield new User_1.default().create(Object.assign(Object.assign({}, req.body), { password: helpers_1.default.hash(req.body.password, 10) }));
                /**run account creation event */
                yield AccountEvents_1.default.emit(AccountEvents_1.default.events.INIT_ACCOUNT, user_id);
                return _super.sendSuccessResponse.call(this, res, { id: user_id, fullname: req.body.fullname, email: req.body.email }, 'Account has been created', HttpsResponse_1.default.HTTP_CREATED);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    login(req, res, next) {
        const _super = Object.create(null, {
            sendSuccessResponse: { get: () => super.sendSuccessResponse }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error } = Validator_1.default.validateBody(req, {
                    email: joi_1.default.string().email().required(),
                    password: joi_1.default.string().required().min(6).max(15),
                });
                if (error) {
                    return next(Validator_1.default.RequestValidationError(error.message));
                }
                /**check if user exists */
                const user = yield new User_1.default().findByEmail(req.body.email);
                if (!user) {
                    return next(new ApiError_1.default('User does not exist', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                        message: 'Please create an account with the following details',
                    }));
                }
                /**check if passwords match */
                const comparePasswords = yield helpers_1.default.correctPassword(req.body.password, user.password);
                if (!comparePasswords) {
                    return next(new ApiError_1.default('User details does not match', HttpsResponse_1.default.HTTP_BAD_REQUEST, {
                        message: 'Could not verify email or password',
                    }));
                }
                const token = yield AuthController.createAccessToken(user);
                /** send success response */
                return _super.sendSuccessResponse.call(this, res, {
                    user: { email: user.email, id: user.id, fullname: user.fullname },
                    access_token: token,
                }, 'Login successfull', HttpsResponse_1.default.HTTP_OK);
            }
            catch (error) {
                return next(error);
            }
        });
    }
    static createAccessToken(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = helpers_1.default.signToken({ id: user === null || user === void 0 ? void 0 : user.id, email: user === null || user === void 0 ? void 0 : user.email });
                const date = helpers_1.default.addDays(new Date(), 7);
                yield (0, database_1.default)('access_tokens').insert({
                    token,
                    user_id: user === null || user === void 0 ? void 0 : user.id,
                    revoked: false,
                    expires_at: date.toString(),
                    expires_at_ms: date.getTime(),
                });
                return token;
            }
            catch (error) {
                Promise.reject(error);
            }
        });
    }
}
exports.default = new AuthController();
