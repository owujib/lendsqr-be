"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __importDefault(require("."));
const AccountHooks_1 = __importDefault(require("../hooks/AccountHooks"));
class AccountEvents extends _1.default {
    constructor() {
        super();
        this.events = {
            INIT_ACCOUNT: 'INIT_ACCOUNT',
        };
        this.on(this.events.INIT_ACCOUNT, AccountHooks_1.default.initAccount);
    }
}
exports.default = new AccountEvents();
