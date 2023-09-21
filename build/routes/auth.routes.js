"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const AuthController_1 = __importDefault(require("../api/controllers/AuthController"));
const router = (0, express_1.Router)();
router.post('/register', AuthController_1.default.register);
router.post('/login', AuthController_1.default.login);
exports.default = router;
