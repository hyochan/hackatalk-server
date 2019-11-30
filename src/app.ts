import * as cors from 'cors';
import * as express from 'express';

import { startServer } from './server';

require('dotenv').config();

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.get('/', (req, res) => {
    res.send('It works!!!! production x7');
  });

  return app;
};

if (process.env.NODE_ENV !== 'test') {
  const app = createApp();
  startServer(app);
}
