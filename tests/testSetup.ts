import { GraphQLClient, request } from 'graphql-request';

import { Http2Server } from 'http2';
import { createApp } from '../src/app';
import express from 'express';
import sequelize from '../src/db';
import { startServer } from '../src/server';

const port = 4000;
let server: Http2Server;

export const testHost = `http://localhost:${port}/graphql`;
export const getClientUserSignedIn = async (
  testHost: string,
  signInEmail: string,
): Promise<GraphQLClient> => {
  const signInRes = await request(testHost, signInEmail);
  const client = new GraphQLClient(testHost, {
    headers: {
      authorization: `Bearer ${signInRes.signInEmail.token}`,
    },
  });
  return client;
};

beforeAll(async () => {
  const app: express.Application = createApp();
  server = await startServer(app);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.drop();
  server.close();
});
