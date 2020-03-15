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

  it('should resolve channel properties', async () => {
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

  it('should return same channel id when same friends are provided', async () => {
    const { signUp: signUpUser3 } = await request(testHost, signUpUser, {
      user: {
        email: 'dooboo3@dooboolab.com',
        password: 'password',
        name: 'dooboo3',
      },
    });

    const variables = {
      channel: {
        friendIds: [signUpUser3.user.id],
        name: 'test-channel',
      },
    };

    const response1 = await client.request(mutation, variables);
    const channelId = response1.createChannel.id;

    const response2 = await client.request(mutation, variables);
    expect(channelId).toEqual(response2.createChannel.id);
  });

  it('should return different channel id when different friends are provided', async () => {
    const variables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };

    const response1 = await client.request(mutation, variables);
    const channelId = response1.createChannel.id;

    const { signUp: signUpUser1 } = await request(testHost, signUpUser, {
      user: {
        email: 'test-3@dooboolab.com',
        password: 'password',
        name: 'test-3',
      },
    });

    const diffVariables = {
      channel: {
        friendIds: [testUserIds[0], signUpUser1.user.id],
        name: 'test-channel',
      },
    };

    const response2 = await client.request(mutation, diffVariables);
    expect(channelId === response2.createChannel.id).toBeFalsy();
  });

  it('should always resolve different channel id when members are more than 2', async () => {
    const { signUp: signUpUser3 } = await request(testHost, signUpUser, {
      user: {
        email: 'test-4@dooboolab.com',
        password: 'password',
        name: 'test-4',
      },
    });

    testUserIds.push(signUpUser3.user.id);

    const variables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };

    const response1 = await client.request(mutation, variables);
    const channelId = response1.createChannel.id;

    const response2 = await client.request(mutation, variables);
    expect(channelId === response2.createChannel.id).toBeFalsy();
  });
});
