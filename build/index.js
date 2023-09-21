"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./config/logger");
const kernel_1 = __importDefault(require("./kernel"));
const PORT = kernel_1.default.get('PORT');
console.log(kernel_1.default.get('NODE_ENV'));
kernel_1.default.listen(kernel_1.default.get('PORT'), () => {
    logger_1.Logger.info(`server is runing on PORT:${PORT}`);
});
