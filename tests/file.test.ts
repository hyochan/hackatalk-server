import * as azureUtils from '../src/utils/azure';
import { GraphQLClient, request } from 'graphql-request';
import FormData from 'form-data';
import fetch from 'node-fetch';
import { testHost } from './testSetup';

describe('Resolver - File', () => {
  let client: GraphQLClient;
  const signUpUser = /* GraphQL */`
  mutation signUp($user: UserInput!) {
    signUp(user: $user) {
      token,
      user {
        id
        email
      }
    }
  }
`;

  beforeAll(async () => {
    const { signUp } = await request(testHost, signUpUser, {
      user: {
        email: 'test-1@dooboolab.com',
        password: 'password',
        name: 'test-1',
      },
    });
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: signUp.token,
      },
    });

    jest
      .spyOn(azureUtils, 'uploadFileToAzureBlobFromStream')
      .mockImplementation(() => Promise.resolve(null));
  });

  it('should return a file path after uploading one', async () => {
    const body = new FormData();
    body.append(
      'operations',
      JSON.stringify({
        query: `
          mutation($file: Upload!) {
            singleUpload(file: $file) 
          }
        `,
        variables: {
          file: null,
        },
      }),
    );

    body.append('map', JSON.stringify({ 1: ['variables.file'] }));
    body.append('1', 'a', { filename: 'a.txt' });

    const response = await fetch(testHost, { method: 'POST', body });
    const jsonResult = await response.json();
    expect(jsonResult.data.singleUpload).toBe('/defaults/a.txt');
  });
});
