import { request } from 'graphql-request';

const port = 4000;
(global as any).TEST_HOST = `http://localhost:${port}/graphql`;
(global as any).createTestUser = async (name: string): Promise<string> => {
  const port = 4000;
  const testHost = `http://localhost:${port}/graphql`;
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
          id
          email
        }
      }
    }
  `;

  const response = await request(testHost, mutation);
  return response.signUp;
};
