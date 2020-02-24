import { GraphQLClient, request } from 'graphql-request';

import { ErrorString } from '../src/utils/error';
import { testHost } from './testSetup';

describe('Resolver - Reaction', () => {
  let client: GraphQLClient;
  const signUpUser = /* GraphQL */`
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

  const reactions = /* GraphQL */`
    query {
      reactions(
      ) {
        id,
        type,
      }
    }
  `;

  beforeAll(async () => {
    const { signUp } = await request(testHost, signUpUser);
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: signUp.token,
      },
    });
  });

  it('should query reactions', async () => {
    const response = await client.request(reactions);

    expect(response).toHaveProperty('reactions');
    expect(response.reactions).toEqual([]);
  });

  const createReaction = /* GraphQL */`
    mutation createReaction(
      $type: String!
    ) {
      createReaction(type: $type) {
        type,
      }
    }
  `;

  it('should create reaction', async () => {
    const variables = {
      photoURL: 'http://',
    };
    const response = await client.request(createReaction, variables);

    expect(response).toHaveProperty('createReaction');
    expect(response.createReaction).toEqual({ photoURL: variables.photoURL });
  });

  const deleteReaction = /* GraphQL */`
    mutation deleteReaction(
      $reactionId: ID!
    ) {
      deleteReaction(reactionId: $reactionId)
    }
  `;

  it('should delete reaction', async () => {
    const variables = {
      reactionId: 'test',
    };
    const promise = client.request(deleteReaction, variables);

    expect(promise).resolves.toEqual({
      deleteReaction: 0,
    });
  });

  it('should throw errors during when urls are not valid', () => {
    const variables = {
      photoURL: 'error://',
    };
    const promise = client.request(createReaction, variables);
    expect(promise).rejects.toThrow(ErrorString.UrlNotValid);
  });
});
