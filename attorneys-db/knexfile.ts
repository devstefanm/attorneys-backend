import * as dotenv from 'dotenv';

dotenv.config({ path: `../../.env.${process.env.NODE_ENV}` });

import { Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE || 'attorneys-db',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'ASDasd123',
      host: process.env.DB_HOST || 'localhost',
      port: Number(process.env.DB_PORT) || 5432,
    },
    pool: {
      max: Number(process.env.DB_POOL_SIZE) || 2,
      idleTimeoutMillis:
        Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT) || 10000,
    },
    migrations: {
      directory: './migrations/initial',
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.DATABASE,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: Number(process.env.DB_POOL_SIZE),
      idleTimeoutMillis: Number(process.env.DB_POOL_CLIENT_IDLE_TIMEOUT),
    },
    migrations: {
      directory: './dist/attorneys-db/migrations/initial',
      tableName: 'knex_migrations',
    },
  },
};

export default config;
