import { GraphQLClient, request } from 'graphql-request';
import sequelize from '../src/db';

describe('Resolver - Channel', () => {
  const { TEST_HOST, createTestUser } = global as any;
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

  beforeAll(async () => {
    const testUser = await createTestUser('test-1');
    client = new GraphQLClient(TEST_HOST, {
      headers: {
        authorization: `Bearer ${testUser.token}`,
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

    const promise = request(TEST_HOST, mutation, variables);
    expect(promise).rejects.toThrow('User is not signed in');
  });

  it('should throw Error "friendIds is required"', async () => {
    const variables = {
      channel: {
        friendIds: [],
        name: 'test-channel',
      },
    };

    const promise = client.request(mutation, variables);
    expect(promise).rejects.toThrow('friendIds is required');
  });

  it('should return channel id and name', async () => {
    const testUser = await createTestUser('test-2');
    const variables = {
      channel: {
        friendIds: [testUser.user.id],
        name: 'test-channel',
      },
    };
    const promise = client.request(mutation, variables);
    expect(promise).resolves.toHaveProperty('createChannel.id');
    expect(promise).resolves.toHaveProperty('createChannel.name');
    expect(promise).resolves.toHaveProperty('createChannel.type');
  });

  afterAll(async () => {
    await sequelize.drop();
  });
});
