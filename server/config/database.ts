import dotenv from 'dotenv';
import { Knex } from 'knex';
import knex from 'knex';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../../.env') });
console.log(path.resolve(__dirname, '../database/migrations'), path.resolve(__dirname, '../../.env'))

export const databaseConfiguration = {
  client: 'mysql',
  connection: {
    host: process.env.DATABASE_HOSTNAME,
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    port: Number(process.env.DATABASE_PORT),
  },

  migrations: {
    directory: path.resolve(__dirname, '../database/migrations'),
    tableName: 'knex_migrations',
  },
};

const instance: Knex = knex(databaseConfiguration as Knex.Config);

instance
  .raw('select 1')
  .then(() => {
    console.info(`Connected to database - OK`);
  })
  .catch((err: any) => {
    console.error(`Failed to connect to database: ${err}`);
    process.exit(1);
  });

export default function () {
  return instance;
}
