import { rule, shield } from 'graphql-shield';

const { JWT_SECRET } = process.env;

export const APP_SECRET = JWT_SECRET;

const rules = {
  hasSignedIn: rule()((parent, args, { verifyUser }) => {
    const auth = verifyUser();
    return Boolean(auth.userId);
  }),
  isAuthenticatedUser: rule()(async (parent, args, { verifyUser, models }) => {
    const { userId } = verifyUser();
    const { User: userModel } = models;

    const user = userModel.findOne({
      where: { id: userId },
      raw: true,
    });

    return userId === user.id;
  }),
};

export const permissions = shield({
  Query: {
    me: rules.hasSignedIn,
  },
  Mutation: {
    updateProfile: rules.isAuthenticatedUser,
    setOnlineStatus: rules.hasSignedIn,
    changeEmailPassword: rules.isAuthenticatedUser,
  },
});
