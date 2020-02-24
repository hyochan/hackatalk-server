import Channel from './channel';
import Chat from './message';
import Friend from './friend';
import Gallery from './gallery';
import Notification from './notification';
import Reaction from './reaction';
import User from './user';

export const allResolvers = [
  Chat,
  Friend,
  Notification,
  User,
  Channel,
  Gallery,
  Reaction,
];

export default {
  User,
  Friend,
  Chat,
  Notification,
  Channel,
  Gallery,
  Reaction,
};
