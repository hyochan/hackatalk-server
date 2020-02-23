import { GraphQLClient, request } from 'graphql-request';

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

  const updateProfile = /* GraphQL */`
    mutation updateProfile($name: String!
      $nickname: String
      $birthday: Date
      $phone: String
      $gender: Gender
      $thumbURL: String
      $photoURL: String
      $statusMessage: String
    ) {
      updateProfile(
        user: {
          name: $name
          nickname: $nickname
          birthday: $birthday
          gender: $gender
          phone: $phone
          thumbURL: $thumbURL
          photoURL: $photoURL
          statusMessage: $statusMessage
        }
      ) {
        id
        email
        name
        nickname
        birthday
        gender
        phone
        thumbURL
        photoURL
        statusMessage
        socialId
        verified
      }
    }
  `;

  it('should user profile updated after user sign-in', async () => {
    const signInRes = await request(testHost, signInEmail);

    const client = new GraphQLClient(testHost, {
      headers: {
        authorization: `Bearer ${signInRes.signInEmail.token}`,
      },
    });
    const variables = {
      name: 'geoseong',
      nickname: 'nick-geoseong',
      birthday: '2020-02-22',
      gender: 'MALE',
      phone: '+82100000000',
      thumbURL: 'https://avatars2.githubusercontent.com/u/19166187?s=88&v=4',
      photoURL: 'https://avatars2.githubusercontent.com/u/19166187?s=460&v=4',
      statusMessage: 'fighting',
    };
    const mutationRes = await client.request(updateProfile, variables);
    expect(mutationRes).toHaveProperty('updateProfile');
    for (const column in variables) {
      expect(mutationRes.updateProfile).toHaveProperty(column);
      expect(mutationRes.updateProfile[column]).toEqual(variables[column]);
    }
  });
});
