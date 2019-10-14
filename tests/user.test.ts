import { Http2Server } from 'http2';
import { request } from 'graphql-request';
import sequelize from '../src/db';
import { startServer } from '../src/app';

const port = 4000;
const testHost = `http://localhost:${port}/graphql`;

describe('Resolver - User', () => {
  let server: Http2Server;
  const name = 'dooboo1';
  const email = `${name}@dooboo.com`;
  const password = 'password';

  const mutation = `
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
    await sequelize.sync();
    server = await startServer();
  });

  it('should signUp user', async () => {
    const response: any = await request(testHost, mutation);

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
