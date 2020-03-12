/* eslint-disable */
const dotenv = require('dotenv');
const path = require('path');

function initializeDotEnv() {
  const env = process.env.NODE_ENV;
  const envPath = env === 'development'
    ? path.resolve(__dirname, '../dotenv/dev.env')
    : env === 'test'
      ? path.resolve(__dirname, '../dotenv/test.env')
      : path.resolve(__dirname, '../dotenv/.env');
  dotenv.config({ path: envPath });
};
/* eslint-enable */

module.exports = initializeDotEnv;
