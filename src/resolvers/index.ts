import Channel from './channel';
import Chat from './message';
import File from './file';
import Friend from './friend';
import Gallery from './gallery';
import Notification from './notification';
import User from './user';

export const allResolvers = [
  Chat,
  Friend,
  Notification,
  User,
  Channel,
  Gallery,
  File,
];

export default {
  User,
  Friend,
  Chat,
  Notification,
  Channel,
  Gallery,
  File,
};
