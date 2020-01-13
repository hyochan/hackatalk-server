import Channel from './channel';
import Chat from './message';
import Friend from './friend';
import Notification from './notification';
import User from './user';

export const allResolvers = [
  Chat,
  Channel,
  Friend,
  Notification,
  User,
];

export default {
  User,
  Friend,
  Channel,
  Chat,
  Notification,
};
