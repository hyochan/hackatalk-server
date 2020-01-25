import { encryptCredential, validateCredential } from './utils/auth';
import express, { Express } from 'express';

import cors from 'cors';
import qs from 'querystring';
import { resetPassword } from './models/User';

require('dotenv').config();

export const createApp = (): Express => {
  const app = express();

  app.use(cors());
  app.use(express.static('public'));
  app.get('/.well-known/acme-challenge/uzhez1JlZi99vlZ07resS0OgYiWOC98PQuV2ZixBp2I',
    async (req, res) => {
      return res.send(
        'uzhez1JlZi99vlZ07resS0OgYiWOC98PQuV2ZixBp2I.urlFAQNtUO24xHjsLG72mMU-xptyO3NTqLp9K7yv9qI',
      );
    });
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
    res.send('It works!!!! production x15');
  });

  return app;
};
