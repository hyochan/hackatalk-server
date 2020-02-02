import sequelize from '../src/db';

module.exports = async (): Promise<void> => {
  await sequelize.drop();
  (global as any).SERVER.close();
};
