"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const logPath = path_1.default.join(__dirname, '../logs/app.log');
const errorPath = path_1.default.join(__dirname, '../logs/error.log');
const infoOptions = {
    level: 'info',
    filename: logPath,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
};
const errorOptions = {
    level: 'error',
    filename: errorPath,
    handleExceptions: true,
    json: true,
    maxsize: 5242880,
    maxFiles: 5,
    colorize: false,
};
const consoleOptions = {
    console: {
        level: 'error',
        handleExceptions: true,
        json: false,
        colorize: true,
    },
};
const logs = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.File(Object.assign({}, infoOptions)),
        new winston_1.default.transports.File(Object.assign({}, errorOptions)),
        new winston_1.default.transports.Console(Object.assign({}, consoleOptions.console)),
    ],
    exitOnError: false, // do not exit on handled exceptions
});
logs.stream = {
    write(message, encoding) {
        logs.info(message);
    },
};
/**
 * @description methods helps take all server error events or message and transport to logs file
 */
const customLogger = winston_1.default.createLogger({
    transports: [
        new winston_1.default.transports.Console(),
        new winston_1.default.transports.File(Object.assign({}, errorOptions)),
    ],
});
exports.default = logs;
exports.Logger = customLogger;
