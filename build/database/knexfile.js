"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: path_1.default.resolve('.env') });
exports.config = {
    development: {
        client: 'mysql',
        connection: {
            host: process.env.DATABASE_HOSTNAME,
            port: Number(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
    test: {
        client: 'mysql',
        connection: {
            host: process.env.TEST_DATABASE_HOSTNAME,
            port: Number(process.env.TEST_DATABASE_PORT),
            user: process.env.TEST_DATABASE_USER,
            password: process.env.TEST_DATABASE_PASSWORD,
            database: process.env.TEST_DATABASE_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
            directory: path_1.default.join(__dirname, 'migrations'),
        },
        seeds: {
            directory: path_1.default.join(__dirname, 'seeds'),
        },
    },
};
exports.default = exports.config;
// const instance: Knex = knex(config);
// instance
//   .raw('select 1')
//   .then(() => {
//     console.info(`Connected to database - OK`);
//   })
//   .catch((err) => {
//     console.error(`Failed to connect to database: ${err}`);
//     process.exit(1);
//   });
// export const db = () => instance;
