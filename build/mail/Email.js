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
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const html_to_text_1 = require("html-to-text");
dotenv_1.default.config({ path: path_1.default.resolve('../.env') });
class Email {
    constructor({ emailService, email }) {
        this.sender = '<info@testing.com>';
        this.to = email;
        this.maxTries = 3;
        this.emailService = emailService;
    }
    sendMail({ subject, html }) {
        return __awaiter(this, void 0, void 0, function* () {
            const mailOptions = {
                from: this.sender,
                to: this.to,
                subject: subject.title,
                text: (0, html_to_text_1.htmlToText)(html),
                html,
            };
            yield this.emailService.sendMail(mailOptions);
        });
    }
}
exports.default = Email;
