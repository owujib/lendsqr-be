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
const ejs_1 = __importDefault(require("ejs"));
const path_1 = __importDefault(require("path"));
const Email_1 = __importDefault(require("../Email"));
const NodemailerService_1 = __importDefault(require("../NodemailerService"));
class AuthMail {
    constructor(user) {
        this.to = user.email;
        this.send = (subject, html) => __awaiter(this, void 0, void 0, function* () {
            return new Email_1.default({
                emailService: new NodemailerService_1.default(),
                email: this.to,
            }).sendMail({ subject, html });
        });
    }
    sendWelcome(subject) {
        return __awaiter(this, void 0, void 0, function* () {
            const html = yield ejs_1.default.renderFile(path_1.default.resolve('views/mail/welcome.ejs'), {});
            return this.send(subject, html);
        });
    }
}
exports.default = AuthMail;
