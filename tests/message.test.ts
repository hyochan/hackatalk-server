import { GraphQLClient, request } from 'graphql-request';

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

  const createChannel = /* GraphQL */`
    mutation createChannel($channel: ChannelInput){
      createChannel(channel: $channel) {
        id
        type
        name
      }
    }
  `;

  const createMessage = /* GraphQL */`
    mutation createMessage($message: String!, $channelId: String!) {
      createMessage(
        message: $message
        channelId: $channelId
      ) {
        channelId
      }
    }
  `;

  it('should createMessage directly with channelId provided', async () => {
    const channelVariables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };

    const channelResponse = await client.request(createChannel, channelVariables);

    const messageVariables = {
      message: 'hello hello!!',
      channelId: channelResponse.createChannel.id,
    };
    const response = await client.request(createMessage, messageVariables);
    expect(response).toHaveProperty('createMessage');
    expect(response.createMessage).toHaveProperty('channelId');
    expect(response.createMessage.channelId).toEqual(channelResponse.createChannel.id);
  });

  it('should throw errors when message is empty', () => {
    const variables = {
      message: '',
      users: testUserIds,
    };

    const promise = client.request(createMessage, variables);
    expect(promise).rejects.toThrow();
  });
});
