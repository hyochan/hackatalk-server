import * as cors from 'cors';
import * as express from 'express';

require('dotenv').config();

export const createApp = () => {
  const app = express();

  app.use(cors());
  app.get('/', (req, res) => {
    res.send('It works!!!! production x7');
  });

  return app;
};
