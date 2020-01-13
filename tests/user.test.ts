import { Http2Server } from 'http2';
import { createApp } from '../src/app';
import { request } from 'graphql-request';
import sequelize from '../src/db';
import { startServer } from '../src/server';

const port = 4000;
const testHost = `http://localhost:${port}/graphql`;

describe('Resolver - User', () => {
  let server: Http2Server;
  const name = 'dooboo10';
  const email = `${name}@dooboo.com`;
  const password = 'password';

  const mutation = /* GraphQL */`
    mutation {
      signUp(user: {
        email: "${email}"
        password: "${password}"
        name: "${name}"
      }) {
        token,
        user {
          email
        }
      }
    }
  `;

  beforeAll(async () => {
    const app = createApp();

    await sequelize.sync();
    server = await startServer(app);
  });

  it('should signUp user', async () => {
    const response = await request(testHost, mutation);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(email);
  });

  afterAll(async () => {
    await sequelize.drop();
    server.close();
  });
});
