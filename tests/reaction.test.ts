import { GraphQLClient, request } from 'graphql-request';

import { testHost } from './testSetup';

describe('Resolver - Reaction', () => {
  let client: GraphQLClient;
  const testUserIds = [];
  const signUpUser = /* GraphQL */ `
    mutation signUp($user: UserInput!) {
      signUp(user: $user) {
        token
        user {
          id
          email
        }
      }
    }
  `;

  const reactions = /* GraphQL */`
    query {
      reactions(
        messageId: "message_id"
      ) {
        id,
        type,
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
  });

  const createChannel = /* GraphQL */ `
    mutation createChannel($channel: ChannelInput) {
      createChannel(channel: $channel) {
        id
        type
        name
      }
    }
  `;

  const createMessage = /* GraphQL */ `
    mutation createMessage($message: String!, $channelId: String!) {
      createMessage(message: $message, channelId: $channelId) {
        channelId
        message {
          id
        }
      }
    }
  `;

  const createReaction = /* GraphQL */ `
    mutation createReaction($type: String!, $messageId: ID!) {
      createReaction(messageId: $messageId, type: $type) {
        id
      }
    }
  `;

  it('should query reactions', async () => {
    const response = await client.request(reactions);
    expect(response).toHaveProperty('reactions');
    expect(response.reactions).toEqual([]);
  });

  it('should create reaction', async () => {
    const channelVariables = {
      channel: {
        friendIds: testUserIds,
        name: 'test-channel',
      },
    };
    const channelResponse = await client.request(
      createChannel,
      channelVariables,
    );

    const messageVariables = {
      message: 'hello hello!!',
      channelId: channelResponse.createChannel.id,
    };
    const messageResponse = await client.request(
      createMessage,
      messageVariables,
    );

    const reactionVariables = {
      messageId: messageResponse.createMessage.message.id,
      type: 'smile',
    };
    const response = await client.request(createReaction, reactionVariables);

    expect(response).toHaveProperty('createReaction');
    expect(response.createReaction).toHaveProperty('id');
    expect(response.createReaction.id).not.toBeNull();
  });

  const deleteReaction = /* GraphQL */ `
    mutation deleteReaction($reactionId: ID!) {
      deleteReaction(reactionId: $reactionId)
    }
  `;

  it('should delete reaction', async () => {
    const variables = {
      reactionId: 'a0000000-0000-0000-0000-000000000000',
    };
    const response = await client.request(deleteReaction, variables);

    expect(response).toHaveProperty('deleteReaction');
    expect(response.deleteReaction).toBe(0);
  });
});
