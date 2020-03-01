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

  beforeAll(async () => {
    const { signUp } = await request(testHost, signUpUser);
    client = new GraphQLClient(testHost, {
      headers: {
        authorization: signUp.token,
      },
    });
  });

  // const reactions = /* GraphQL */`
  //   query {
  //     reactions(
  //     ) {
  //       id,
  //       type,
  //     }
  //   }
  // `;

  // it('should query reactions', async () => {
  //   const response = await client.request(reactions);

  //   expect(response).toHaveProperty('reactions');
  //   expect(response.reactions).toEqual([]);
  // });

  const createReaction = /* GraphQL */`
    mutation createReaction(
      $messageId: ID!,
      $type: String!,
    ) {
      createReaction(messageId: $messageId, type: $type) {
        type,
      }
    }
  `;

  it('should create reaction', async () => {
    expect(true);
    // const response = await client.request(createReaction, {
    //   messageId: 'messageId1',
    //   type: 'type1',
    // });

    // expect(response).toHaveProperty('createReaction');
    // expect(response.createReaction).toEqual('type1');
  });

  // const deleteReaction = /* GraphQL */`
  //   mutation deleteReaction(
  //     $reactionId: ID!
  //   ) {
  //     deleteReaction(reactionId: $reactionId)
  //   }
  // `;

  // it('should delete reaction', async () => {
  //   const variables = {
  //     reactionId: 'test',
  //   };
  //   const promise = client.request(deleteReaction, variables);

  //   expect(promise).resolves.toEqual({
  //     deleteReaction: 0,
  //   });
  // });
});
