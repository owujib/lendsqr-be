import knex from 'knex';
import envConfig from 'dotenv';
import configs from './knexfile';
import path from 'path';

envConfig.config({ path: path.resolve('../../.env') });

const config = configs[process.env.NODE_ENV || 'development'];

const db = knex(config);
export default db;
