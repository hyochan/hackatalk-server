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

  const createChannel = /* GraphQL */`
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

    const promise = request(testHost, createChannel, variables);
    expect(promise).rejects.toThrow();
  });

  it('should throw Error "friendIds is required"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = client.request(createChannel, variables);
    expect(promise).rejects.toThrow();
  });

  it('should return channel id and name', async () => {
    const variables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };
    const promise = client.request(createChannel, variables);
    expect(promise).resolves.toHaveProperty('createChannel.id');
    expect(promise).resolves.toHaveProperty('createChannel.name');
    expect(promise).resolves.toHaveProperty('createChannel.type');
  });

  const channels = /* GraphQL */`
    query {
      channels {
        id
        name
        messages {
          id
          type
          text
        }
      }
    }
  `;

  const createMessage = /* GraphQL */`
    mutation createMessage($message: String!, $users: [String!]!, $channelId: String) {
      createMessage(
        message: $message
        users: $users
        channelId: $channelId
      ) {
        channelId
        message {
            id
            type
            text
            filePath
        }
      }
    }
  `;

  it('should have messages as nested data after create message', async () => {
    const variables = {
      channel: {
        friendIds: [...testUserIds],
        name: 'test-channel2',
      },
    };
    const response = await client.request(createChannel, variables);

    const TEXT = 'Do you like kimchi?';
    const variables2 = {
      message: TEXT,
      users: [...testUserIds],
      channelId: response.createChannel.id,
    };
    const response2 = await client.request(createMessage, variables2);
    expect(response).toHaveProperty('createChannel.id');
    expect(response2.createMessage.channelId).toEqual(response.createChannel.id);

    const response3 = await client.request(channels);
    response3.channels.forEach((channel) => {
      if (channel.id === response.createChannel.id) {
        expect(channel.messages[0].id).toEqual(response2.createMessage.message.id);
        expect(channel.messages[0].text).toEqual(TEXT);
      }
    });
  });
});
