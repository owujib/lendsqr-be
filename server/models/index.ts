// // import { Knex } from 'knex';

// // // Update with your config settings.

// // const config: { [key: string]: Knex.Config } = {
// //   development: {
// //     client: 'sqlite3',
// //     connection: {
// //       filename: './dev.sqlite3',
// //     },
// //   },

// //   staging: {
// //     client: 'postgresql',
// //     connection: {
// //       database: 'my_db',
// //       user: 'username',
// //       password: 'password',
// //     },
// //     pool: {
// //       min: 2,
// //       max: 10,
// //     },
// //     migrations: {
// //       tableName: 'knex_migrations',
// //     },
// //   },

// //   production: {
// //     client: 'postgresql',
// //     connection: {
// //       database: 'my_db',
// //       user: 'username',
// //       password: 'password',
// //     },
// //     pool: {
// //       min: 2,
// //       max: 10,
// //     },
// //     migrations: {
// //       tableName: 'knex_migrations',
// //     },
// //   },
// // };

// // module.exports = config;

// import dotenv from 'dotenv/config';

// // dotenv.config()

// export namespace Knex {
//   export const config = {
//     client: 'mysql',
//     connection: {
//       host: process.env.DATABASE_HOSTNAME,
//       database: process.env.DATABASE_NAME,
//       user: process.env.DATABASE_USERNAME,
//       password: process.env.DATABASE_PASSWORD,
//       port: process.env.DATABASE_PORT,
//     },
//     pool: {
//       min: process.env.DATABASE_POOL_MIN,
//       max: process.env.DATABASE_POOL_MAX,
//       idle: process.env.DATABASE_POOL_IDLE,
//     },
//     migrations: {
//       tableName: 'knex_migrations',
//       directory: "./database/migrations",
//     },

//   };
// }

// export default Knex;
import * as Knex from 'knex';
import db, { databaseConfiguration } from '../config/database';

export default databaseConfiguration;
