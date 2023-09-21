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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const moment_1 = __importDefault(require("moment"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const HttpsResponse_1 = __importDefault(require("../../helpers/HttpsResponse"));
const ApiError_1 = __importDefault(require("../../utils/ApiError"));
const database_1 = __importDefault(require("../../database"));
dotenv_1.default.config({ path: path_1.default.resolve('../../../.env') });
class AuthMiddleWare {
    verifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //  1) Getting token and check of it's there
                let token;
                if (req.headers.authorization &&
                    req.headers.authorization.startsWith('Bearer')) {
                    token = req.headers.authorization.split(' ')[1];
                }
                // check is token is present in header
                if (!token) {
                    return next(new ApiError_1.default('you do not have a session id', HttpsResponse_1.default.HTTP_UNAUTHORIZED, { message: 'session  is invalid' }));
                }
                // check for token
                const jwtToken = yield (0, database_1.default)('access_tokens')
                    .where('token', token)
                    .first();
                if (!jwtToken) {
                    return next(new ApiError_1.default('Unauthorized access', HttpsResponse_1.default.HTTP_UNAUTHORIZED, {
                        message: 'Unauthorized Access Please log in',
                    }));
                }
                const expiredAt = (0, moment_1.default)(jwtToken === null || jwtToken === void 0 ? void 0 : jwtToken.expires_at_ms);
                const currentDate = (0, moment_1.default)();
                if (currentDate.isAfter(expiredAt)) {
                    yield (0, database_1.default)('access_tokens')
                        .where({ id: jwtToken.id })
                        .del();
                    return next(new ApiError_1.default('session has expired please log in again', HttpsResponse_1.default.HTTP_UNAUTHORIZED, {
                        message: 'Session has expired',
                    }));
                }
                // 2) docode token
                const decoded = jsonwebtoken_1.default.verify(token, process.env.APP_KEY);
                // 2) Verification token
                const user = yield (0, database_1.default)('users')
                    .where({ email: decoded.email })
                    .first();
                // check if user exists
                if (!user) {
                    return next(new ApiError_1.default('data invalid as user does not exist', HttpsResponse_1.default.HTTP_UNAUTHORIZED, { message: 'try logging in or contact support' }));
                }
                req.user = user;
                return next();
            }
            catch (error) {
                if (error.name === 'JsonWebTokenError') {
                    error = yield handleJWTError(req, error);
                }
                if (error.name === 'TokenExpiredError') {
                    error = yield handleJWTExpiredError(req, error);
                }
                return next(error);
            }
        });
    }
}
const handleJWTError = (req, err) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        yield (0, database_1.default)('access_tokens').where({ token }).del();
    }
    return new ApiError_1.default('Invalid token. Please log in again!', HttpsResponse_1.default.HTTP_UNAUTHORIZED, {});
});
const handleJWTExpiredError = (req, err) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
        yield (0, database_1.default)('access_tokens').where({ token }).del();
    }
    return new ApiError_1.default('Your token has expired! Please log in again.', HttpsResponse_1.default.HTTP_UNAUTHORIZED, {});
});
exports.default = new AuthMiddleWare();
