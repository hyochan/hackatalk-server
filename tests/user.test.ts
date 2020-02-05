import { request } from 'graphql-request';
import { testHost } from './testSetup';

describe('Resolver - User', () => {
  const name = 'dooboo1';
  const email = `${name}@dooboo.com`;
  const password = 'password';

  const signUp = /* GraphQL */`
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
    const response = await request(testHost, signUp);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(email);
  });

  const signInEmail = /* GraphQL */`
    mutation {
      signInEmail(
        email: "dooboo1@dooboo.com"
        password: "password"
      ) {
        token,
        user {
          email
        }
      }
    }
  `;

  it('should signIn email user', async () => {
    const response = await request(testHost, signInEmail);

    expect(response).toHaveProperty('signInEmail');
    expect(response.signInEmail).toHaveProperty('token');
    expect(response.signInEmail).toHaveProperty('user');
    expect(response.signInEmail.user.email).toEqual(email);
  });
});
