import Chat from './message';
import Friend from './friend';
import Notification from './notification';
import User from './user';

export const allResolvers = [
  Chat,
  Friend,
  Notification,
  User,
];

export default {
  User,
  Friend,
  Chat,
  Notification,
};
