import { createApp } from '../src/app';
import sequelize from '../src/db';
import { startServer } from '../src/server';

module.exports = async (): Promise<void> => {
  const app = createApp();

  await sequelize.sync();
  (global as any).SERVER = await startServer(app);
};
