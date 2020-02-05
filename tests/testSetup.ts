import { Http2Server } from 'http2';
import { createApp } from '../src/app';
import express from 'express';
import sequelize from '../src/db';
import { startServer } from '../src/server';

const port = 4000;
let server: Http2Server;
export const testHost = `http://localhost:${port}/graphql`;

beforeAll(async () => {
  const app: express.Application = createApp();
  server = await startServer(app);
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.drop();
  server.close();
});
