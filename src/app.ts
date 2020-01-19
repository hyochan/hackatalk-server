import { encryptCredential, validateCredential } from './utils/auth';
import express, { Express } from 'express';

import cors from 'cors';
import qs from 'querystring';
import { resetPassword } from './models/User';

require('dotenv').config();

export const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.get('/reset_password/:email/:hashed', async (req, res) => {
    const email = qs.unescape(req.params.email);
    const hashed = qs.unescape(req.params.hashed);

    try {
      const validated = await validateCredential(email, hashed);
      if (validated) {
        const password = await encryptCredential('dooboolab2017');
        await resetPassword(email, password);
        return res.send(
          'Your password has successfully changed. Please sign in and change the password.',
        );
      }
      res.send('Error occured. Plesae try again.');
    } catch (err) {
      res.send('Error occured. Plesae try again.');
    }
  });
  app.get('/', (req, res) => {
    res.send('It works!!!! production x9');
  });

  return app;
};
