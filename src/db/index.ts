import { Dialect, Sequelize } from 'sequelize';

import config from '../../config/config';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    dialect: config.dialect as Dialect,
    define: config.define,
    host: config.host,
    dialectOptions: config.dialectOptions,
    pool: config.pool,
    logging: false,
  },
);

export default sequelize;
