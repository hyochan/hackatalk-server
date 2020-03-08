import { GraphQLClient, request } from 'graphql-request';

import { testHost } from './testSetup';

describe('Resolver - Channel', () => {
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

    const { signUp: signUpUser2 } = await request(testHost, signUpUser, {
      user: {
        email: 'test-2@dooboolab.com',
        password: 'password',
        name: 'test-2',
      },
    });

    testUserIds.push(signUpUser2.user.id);
  });

  const mutation = /* GraphQL */`
    mutation createChannel($channel: ChannelInput){
      createChannel(channel: $channel) {
        id
        type
        name
      }
    }
  `;

  it('should throw Error "User is not signed in"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = request(testHost, mutation, variables);
    expect(promise).rejects.toThrow();
  });

  it('should throw Error "friendIds is required"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = client.request(mutation, variables);
    expect(promise).rejects.toThrow();
  });

  it('should return channel id and name', async () => {
    const variables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };
    const promise = client.request(mutation, variables);
    expect(promise).resolves.toHaveProperty('createChannel.id');
    expect(promise).resolves.toHaveProperty('createChannel.name');
    expect(promise).resolves.toHaveProperty('createChannel.type');
  });
});
