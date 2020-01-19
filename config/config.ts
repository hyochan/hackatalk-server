import dotenv from 'dotenv';
import path from 'path';

const env = process.env.NODE_ENV;

const envPath =
  env === 'development'
    ? path.resolve(__dirname, '../dotenv/dev.env')
    : env === 'test'
      ? path.resolve(__dirname, '../dotenv/test.env')
      : path.resolve(__dirname, '../dotenv/.env');

dotenv.config({ path: envPath });

const similarOption = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
  define: {
    underscored: false,
  },
};

module.exports = {
  local: {
    ...similarOption,
  },
  development: {
    ...similarOption,
  },
  test: {
    ...similarOption,
  },
  production: {
    ...similarOption,
    dialectOptions: {
      ssl: {},
    },
    pool: { max: 5, min: 0, idle: 10000 },
  },
};
