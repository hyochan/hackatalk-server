const env = process.env.NODE_ENV;
const dotenv = require('dotenv');
const path = require('path');

const envPath = env === 'production'
  ? path.resolve(__dirname, `../dotenv/prod.env`)
  : env === 'development'
    ? path.resolve(__dirname, `../dotenv/dev.env`)
    : path.resolve(__dirname, `../dotenv/.env`);

dotenv.config({ path: envPath });

const similarOption = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_TYPE,
};

module.exports = {
  development: {
    ...similarOption,
    define: {
      underscored: false,
    },
  },
  test: {
    ...similarOption,
    define: {
      underscored: false,
    },
  },
  production: {
    ...similarOption,
    dialectOptions: {
      ssl: {},
    },
    define: {
      underscored: false,
    },
    pool: { max: 5, min: 0, idle: 10000 },
  },
};
