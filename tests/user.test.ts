import { GraphQLClient, request } from 'graphql-request';

import { ErrorString } from '../src/utils/error';
import models from '../src/models';
import { testHost } from './testSetup';

jest.mock('../src/utils/virgil', () => {
  return jest.fn();
});

const verifyUser = async (): Promise<void> => {
  /* Verify Users */
  const { User: userModel } = models;
  await userModel.update(
    {
      verified: true,
    },
    {
      where: {
        verified: false,
      },
    },
  );
};

describe('Resolver - User', () => {
  let client: GraphQLClient;

  const name = 'dooboo1';
  const email = 'dooboo1@dooboolab.com';
  const password = 'password';
  const updateName = 'geoseong';

  const nameTwo = 'dooboo2';
  const emailTwo = 'dooboo2@dooboolab.com';
  const passwordTwo = 'password';

  const signInEmail = /* GraphQL */ `
    mutation {
      signInEmail(email: "${email}", password: "${password}") {
        token
        user {
          email
        }
      }
    }
  `;
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
        name,
        email,
        password,
      },
    });
    const { signUp: signUpTwo } = await request(testHost, signUpUser, {
      user: {
        name: nameTwo,
        email: emailTwo,
        password: passwordTwo,
      },
    });
    await verifyUser();
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: `Bearer ${signUp.token}`,
      },
    });
  });

  it('should signUp user', async () => {
    const email = 'dooboo3@dooboolab.com';
    const response = await request(testHost, signUpUser, {
      user: {
        name: 'dooboo3',
        email,
        password: 'password',
      },
    });

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(email);
  });

  it('should signIn email user', async () => {
    const response = await request(testHost, signInEmail);
    expect(response).toHaveProperty('signInEmail');
    expect(response.signInEmail).toHaveProperty('token');
    expect(response.signInEmail).toHaveProperty('user');
    expect(response.signInEmail.user.email).toEqual(email);
  });

  it('should user profile updated after user sign-in', async () => {
    const updateProfile = /* GraphQL */ `
      mutation updateProfile(
        $name: String!
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
    const variables = {
      name: updateName,
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

  it('should error thrown when "first" and "last" arguments entered', async () => {
    const qryFirstLast = /* GraphQL */ `
      query {
        users(first: 1, last: 1) {
          totalCount
          edges {
            node {
              id
              name
              birthday
              email
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const promise = client.request(qryFirstLast);
    expect(promise).rejects.toThrow(ErrorString.FirstLastNotSupported);
  });

  it('should get user with "filter" and "user" argument', async () => {
    const queryFilterAndUser = /* GraphQL */ `
      query users($user: UserQueryInput) {
        users(filter: true, user: $user) {
          totalCount
          edges {
            node {
              # id
              # birthday
              name
              email
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variables = {
      user: {
        name: nameTwo,
        email: emailTwo,
      },
    };
    const response = await client.request(queryFilterAndUser, variables);

    expect(response.users.edges).toEqual(
      expect.arrayContaining([{
        node: {
          name: nameTwo,
          email: emailTwo,
        },
      }]),
    );
  });

  it('should get user with "user" argument', async () => {
    const queryUser = /* GraphQL */ `
      query users($user: UserQueryInput) {
        users(user: $user) {
          totalCount
          edges {
            node {
              name
              email
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variables = {
      user: {
        name: nameTwo,
        email: emailTwo,
      },
    };
    const response = await client.request(queryUser, variables);

    expect(response.users.edges).toEqual(
      expect.arrayContaining([{
        node: {
          name: nameTwo,
          email: emailTwo,
        },
      }]),
    );
  });

  it('should get user with "includeUser" argument', async () => {
    const queryIncludeUser = /* GraphQL */ `
      query users {
        users(includeUser: true) {
          totalCount
          edges {
            node {
              name
              email
            }
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const response = await client.request(queryIncludeUser);

    expect(response.users.edges).toEqual(
      expect.arrayContaining([
        {
          node: {
            name: updateName,
            email,
          },
        },
        {
          node: {
            name: nameTwo,
            email: emailTwo,
          },
        },
      ]),
    );
  });

  it('should get users of "after" argument with cursor of result of argument "first"', async () => {
    const queryFirst = /* GraphQL */ `
      query user($first: Int) {
        users(first: $first) {
          totalCount
          edges {
            node {
              id
              name
              birthday
              email
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variables = {
      first: 2,
    };
    const response = await client.request(queryFirst, variables);

    const queryAfter = /* GraphQL */ `
      query user($after: String) {
        users(after: $after) {
          totalCount
          edges {
            node {
              id
              name
              birthday
              email
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variablesAfter = {
      after: response.users.pageInfo.startCursor.toString(),
    };
    const responseAfter = await client.request(queryAfter, variablesAfter);
    expect(response.users.edges).toEqual(
      expect.arrayContaining(responseAfter.users.edges),
    );
  });

  it('should get users of "before" argument with cursor of result of argument "last"', async () => {
    const queryLast = /* GraphQL */ `
      query user($last: Int) {
        users(last: $last) {
          totalCount
          edges {
            node {
              id
              name
              birthday
              email
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variables = {
      last: 5,
    };
    const response = await client.request(queryLast, variables);
    expect(response.users.pageInfo.hasNextPage).toBeFalsy();
    expect(response.users.pageInfo.hasPreviousPage).toBeFalsy();

    const queryBefore = /* GraphQL */ `
      query user($before: String) {
        users(before: $before) {
          totalCount
          edges {
            node {
              id
              name
              birthday
              email
            }
            cursor
          }
          pageInfo {
            endCursor
            hasNextPage
            startCursor
            hasPreviousPage
          }
        }
      }
    `;
    const variablesBefore = {
      before: response.users.pageInfo.endCursor.toString(),
    };
    const responseBefore = await client.request(queryBefore, variablesBefore);
    expect(response.users.edges).toEqual(
      expect.arrayContaining(responseBefore.users.edges),
    );
  });

  it('should user password updated after user sign-in', async () => {
    const changeEmailPassword = /* GraphQL */ `
    mutation changeEmailPassword($password: String!, $newPassword: String!) {
      changeEmailPassword(password: $password, newPassword: $newPassword)
    }
  `;
    const variables = {
      password: 'password',
      newPassword: 'newPassword',
    };
    const mutationRes = await client.request(changeEmailPassword, variables);
    expect(mutationRes).toHaveProperty('changeEmailPassword');
    expect(mutationRes.changeEmailPassword).toEqual(true);
  });
});
