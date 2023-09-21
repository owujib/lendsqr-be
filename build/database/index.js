"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const knex_1 = __importDefault(require("knex"));
const dotenv_1 = __importDefault(require("dotenv"));
const knexfile_1 = __importDefault(require("./knexfile"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.resolve('../../.env') });
const config = knexfile_1.default[process.env.NODE_ENV || 'development'];
const db = (0, knex_1.default)(config);
exports.default = db;
