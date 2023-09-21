"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const WalletController_1 = __importDefault(require("../api/controllers/WalletController"));
const AuthMiddleware_1 = __importDefault(require("../api/middlewares/AuthMiddleware"));
const router = (0, express_1.Router)();
router.use(AuthMiddleware_1.default.verifyToken);
router.post('/transfer', WalletController_1.default.transfer);
router.post('/withdraw', WalletController_1.default.withdraw);
router.post('/top-up', WalletController_1.default.topUp);
exports.default = router;
