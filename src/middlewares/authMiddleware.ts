import * as jwt from 'jsonwebtoken';

export default function authMiddleware (appSecret: string) {
  if (!appSecret) {
    throw new Error('The secret to encrypt JWT is must be provided');
  }

  return async (resolve, parent, args, context, info) => {
    let currentUser = null;

    const authHeader = context.request.get('Authorization');
    if (authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const userId = jwt.verify(token, appSecret);
      currentUser = await context.models.User.findOne({
        where: {
          id: userId,
        },
      });
    }

    const contextWithCurrentUser = {
      ...context,
      appSecret,
      currentUser,
    };

    try {
      const result = await resolve(parent, args, contextWithCurrentUser, info);
      return result;
    } catch (err) {
      // Catch NPE on context.currentUser
      throw new Error(err);
    }
  };
}
