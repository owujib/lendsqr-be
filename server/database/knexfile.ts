import { Knex } from 'knex';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
// Update with your config settings.

interface KnexConfig {
  [key: string]: Knex.Config;
}

export const config: KnexConfig = {
  development: {
    client: 'mysql2',
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
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
  test: {
    client: 'mysql2',
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
      directory: path.join(__dirname, 'migrations'),
    },
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
  production: {
    client: 'mysql2',
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
    seeds: {
      directory: path.join(__dirname, 'seeds'),
    },
  },
};

export default config;
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
