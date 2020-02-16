import { GraphQLClient, request } from 'graphql-request';

import { ErrorString } from '../src/utils/error';
import { testHost } from './testSetup';

describe('Resolver - Channel', () => {
  let client: GraphQLClient;
  const mutation = /* GraphQL */`
    mutation createChannel($channel: ChannelInput){
      createChannel(channel: $channel) {
        id
        type
        name
      }
    }
  `;

  const signUpMutationUser1 = /* GraphQL */`
    mutation {
      signUp(user: {
        email: "test-1@dooboo.com"
        password: "test-1"
        name: "test-1"
      }) {
        token,
        user {
          email
        }
      }
    }
  `;

  const signUpMutationUser2 = /* GraphQL */`
    mutation {
      signUp(user: {
        email: "test-2@dooboo.com"
        password: "test-2"
        name: "test-2"
      }) {
        token,
        user {
          email
        }
      }
    }
  `;

  beforeAll(async () => {
    const { signUp } = await request(testHost, signUpMutationUser1);
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: signUp.token,
      },
    });
  });

  it('should throw Error "User is not signed in"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = request(testHost, mutation, variables);
    expect(promise).rejects.toThrow(ErrorString.UserNotSignedIn);
  });

  it('should throw Error "friendIds is required"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = client.request(mutation, variables);
    expect(promise).rejects.toThrow(ErrorString.FriendIdsRequired);
  });

  it('should return channel id and name', async () => {
    const { signUp } = await request(testHost, signUpMutationUser2);
    const variables = {
      channel: {
        friendIds: [signUp.user.id],
        name: 'test-channel',
      },
    };
    const promise = client.request(mutation, variables);
    expect(promise).resolves.toHaveProperty('createChannel.id');
    expect(promise).resolves.toHaveProperty('createChannel.name');
    expect(promise).resolves.toHaveProperty('createChannel.type');
  });
});
