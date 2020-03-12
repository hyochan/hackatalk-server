
// eslint-disable-next-line @typescript-eslint/no-var-requires
const initDotEnv = require('./initDotEnv');

if (!process.env.AZURE_ENV) {
  initDotEnv();
}

let config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_CONNECTOR,
  define: {
    underscored: false,
  },
};

if (process.env.NODE_ENV === 'production') {
  config = {
    ...config,
    dialectOptions: {
      ssl: {},
    },
    pool: { max: 5, min: 0, idle: 10000 },
  };
}

module.exports = config;
