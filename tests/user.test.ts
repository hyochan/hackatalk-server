import { request } from 'graphql-request';
import sequelize from '../src/db';

describe('Resolver - User', () => {
  const { TEST_HOST } = global as any;
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

  it('should signUp user', async () => {
    const response = await request(TEST_HOST, mutation);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(email);
  });

  afterAll(async () => {
    await sequelize.drop();
  });
});
