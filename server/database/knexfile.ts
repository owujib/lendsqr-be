import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      port: 3306,
      user: 'admin',
      password: 'password',
      database: 'lendsqr_db',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};

export default config;
