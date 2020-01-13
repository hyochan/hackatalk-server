import { Chatroom, Resolvers } from '../generated/graphql';

import { AuthenticationError } from 'apollo-server-core';

const resolver: Resolvers = {
  Query: {
    chatrooms: async (
      _,
      args, {
        getUser,
        models,
      },
    ): Promise<Chatroom[]> => {
      const { Chatroom: chatroomModel } = models;
      const user = await getUser();

      if (!user) throw new AuthenticationError('User is not signed in');

      return chatroomModel.findAll({
        where: {
          ownerId: chatroomModel.id,
        },
      });
    },
  },
};

export default resolver;
