import { getClientUserSignedIn, testHost } from './testSetup';

import { ErrorString } from '../src/utils/error';
import models from '../src/models';
import { request } from 'graphql-request';

jest.mock('../src/utils/virgil', () => {
  return jest.fn();
});

const signInEmail = /* GraphQL */ `
  mutation {
    signInEmail(email: "dooboo1@dooboo.com", password: "password") {
      token
      user {
        email
    }
  }
`;

const verifyUsers = async (): Promise<void> => {
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
  const name = 'dooboo1';
  const email = `${name}@dooboo.com`;
  const password = 'password';
  const updateName = 'geoseong';

  const signUp = /* GraphQL */ `
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

  it('Mutation-signUp: should signUp user', async () => {
    const response = await request(testHost, signUp);

    expect(response).toHaveProperty('signUp');
    expect(response.signUp).toHaveProperty('token');
    expect(response.signUp).toHaveProperty('user');
    expect(response.signUp.user.email).toEqual(email);
  });
  it('Mutation-signInEmail: should signIn email user', async () => {
    const response = await request(testHost, signInEmail);
    expect(response).toHaveProperty('signInEmail');
    expect(response.signInEmail).toHaveProperty('token');
    expect(response.signInEmail).toHaveProperty('user');
    expect(response.signInEmail.user.email).toEqual(email);
  });

  it('Mutation-updateProfile: should user profile updated after user sign-in', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
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
  it('Mutation-changeEmailPassword : should user password updated after user sign-in', async () => {
    const signInRes = await request(testHost, signInEmail);
    const changeEmailPassword = /* GraphQL */ `
    mutation changeEmailPassword($password: String!, $newPassword: String!) {
      changeEmailPassword(password: $password, newPassword: $newPassword)
    }
  `;
    const client = new GraphQLClient(testHost, {
      headers: {
        authorization: `Bearer ${signInRes.signInEmail.token}`,
      },
    });
    const variables = {
      password: 'password',
      newPassword: 'newPassword',
    };
    const mutationRes = await client.request(changeEmailPassword, variables);
    expect(mutationRes).toHaveProperty('changeEmailPassword');
    expect(mutationRes.changeEmailPassword).toEqual(true);

  it('Query-users: should get users with "first" argument', async () => {
    const email = 'parkopp@gmail.com';
    const password = 'password';
    const name = 'parkopp';
    const signUp = /* GraphQL */ `
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
    await request(testHost, signUp);
    await verifyUsers();

    const client = await getClientUserSignedIn(testHost, signInEmail);
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
    expect(response.users.totalCount).toEqual(variables.first);
  });
  it('Query-users: should get users with "last" argument', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
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
      last: 2,
    };
    const response = await client.request(queryLast, variables);
    expect(response.users.totalCount).toEqual(variables.last);
  });

  it('Query-users: should error thrown when "first" and "last" arguments entered', async () => {
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
    const client = await getClientUserSignedIn(testHost, signInEmail);
    const promise = client.request(qryFirstLast);
    expect(promise).rejects.toThrow(ErrorString.FirstLastNotSupported);
  });
  it('Query-users: should get user with "filter" and "user" argument', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
    const queryFilterAndUser = /* GraphQL */ `
      query users($user: UserQueryInput) {
        users(filter: true, user: $user) {
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
      user: {
        name: updateName,
        email,
      },
    };
    const response = await client.request(queryFilterAndUser, variables);
    expect(response.users.totalCount).toEqual(1);
    expect(response.users.edges[0].node.name).toEqual(variables.user.name);
    expect(response.users.edges[0].node.email).toEqual(variables.user.email);
  });
  it('Query-users: should get user with "user" argument', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
    const queryUser = /* GraphQL */ `
      query users($user: UserQueryInput) {
        users(user: $user) {
          totalCount
          edges {
            node {
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
      user: {
        name: updateName,
        email,
      },
    };
    const response = await client.request(queryUser, variables);
    expect(response.users.totalCount).toEqual(1);
    expect(response.users.edges[0].node.name).toEqual(variables.user.name);
    expect(response.users.edges[0].node.email).toEqual(variables.user.email);
  });
  it('Query-users: should get user with "includeUser" argument', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
    const queryIncludeUser = /* GraphQL */ `
      query users {
        users(includeUser: true) {
          totalCount
          edges {
            node {
              name
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
    const response = await client.request(queryIncludeUser);
    expect(response.users.edges).toEqual(
      expect.not.arrayContaining([{
        node: {
          name: updateName,
          email,
        },
      }]),
    );
  });
  it('Query-users: should get users after cursor of argument "after"', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
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
    // /* after cursor of argument "after" */
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
  it('Query-users: should get users after cursor of argument "before"', async () => {
    const client = await getClientUserSignedIn(testHost, signInEmail);
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
      first: 5,
    };
    const response = await client.request(queryFirst, variables);
    expect(response.users.pageInfo.hasNextPage).toBeFalsy();
    expect(response.users.pageInfo.hasPreviousPage).toBeFalsy();
    // /* after cursor of argument "after" */
    const queryAfter = /* GraphQL */ `
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
    const responseBefore = await client.request(queryAfter, variablesBefore);
    expect(response.users.edges).toEqual(
      expect.arrayContaining(responseBefore.users.edges),
    );
  });
});
