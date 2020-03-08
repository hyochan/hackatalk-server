import { GraphQLClient, request } from 'graphql-request';

import { ErrorString } from '../src/utils/error';
import { testHost } from './testSetup';

describe('Resolver - Message', () => {
  let client: GraphQLClient;
  const testUserIds = [];
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
        email: 'test1@dooboolab.com',
        password: 'password',
        name: 'test1',
      },
    });
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: signUp.token,
      },
    });

    const { signUp: signUpUser2 } = await request(testHost, signUpUser, {
      user: {
        email: 'test2@dooboolab.com',
        password: 'password',
        name: 'test2',
      },
    });

    testUserIds.push(signUpUser2.user.id);

    const { signUp: signUpUser3 } = await request(testHost, signUpUser, {
      user: {
        email: 'test3@dooboolab.com',
        password: 'password',
        name: 'test3',
      },
    });
    testUserIds.push(signUpUser3.user.id);
  });

  let firstReturedChannelId = '';
  const createMessage = /* GraphQL */`
    mutation createMessage($message: String!, $users: [String!]!, $channelId: String) {
      createMessage(
        message: $message
        users: $users
        channelId: $channelId
      ) {
        channelId
      }
    }
  `;

  it('should createMessage and get new channelId', async () => {
    const variables = {
      message: 'hello!!',
      users: testUserIds,
    };
    const response = await client.request(createMessage, variables);
    expect(response).toHaveProperty('createMessage');
    expect(response.createMessage).toHaveProperty('channelId');
    firstReturedChannelId = response.createMessage.channelId;
  });

  it('should createMessage and get same channelId', async () => {
    const variables = {
      message: 'hello hello!!',
      users: testUserIds,
    };

    const response = await client.request(createMessage, variables);
    expect(response).toHaveProperty('createMessage');
    expect(response.createMessage).toHaveProperty('channelId');
    expect(response.createMessage.channelId).toEqual(firstReturedChannelId);
  });

  it('should createMessage directly when channelId is provided', async () => {
    const variables = {
      message: 'hello hello!!',
      users: testUserIds,
      channelId: firstReturedChannelId,
    };

    const response = await client.request(createMessage, variables);
    expect(response).toHaveProperty('createMessage');
    expect(response.createMessage).toHaveProperty('channelId');
    expect(response.createMessage.channelId).toEqual(firstReturedChannelId);
  });

  it('should throw errors when message is empty', () => {
    const variables = {
      message: '',
      users: testUserIds,
    };

    const promise = client.request(createMessage, variables);
    expect(promise).rejects.toThrow(ErrorString.MesssageIsEmpty);
  });

  it('should throw errors when users is empty', () => {
    const variables = {
      message: 'test',
      users: [],
    };

    const promise = client.request(createMessage, variables);
    expect(promise).rejects.toThrow(ErrorString.UsersAreEmpty);
  });
});
