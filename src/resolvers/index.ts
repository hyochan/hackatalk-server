import Chat from './chat';
import Chatroom from './chatroom';
import Friend from './friend';
import Notification from './notification';
import User from './User';

export const allResolvers = [
  Chat,
  Chatroom,
  Friend,
  Notification,
  User,
];

export default {
  User,
  Friend,
  Chatroom,
  Chat,
  Notification,
};
