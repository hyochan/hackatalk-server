import { Sequelize } from 'sequelize';
import config from '../../config/config';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

sequelize.sync({
  force: !!(process.env.NODE_ENV === 'test'),
});

export default sequelize;
