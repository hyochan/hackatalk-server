import Chat from './Chat';
import Chatroom from './Chatroom';
import Friend from './Friend';
import Membership from './Membership';
import Notification from './Notification';
import User from './User';

export default {
  User,
  Friend,
  Chatroom,
  Chat,
  Membership,
  Notification,
};

export interface ModelType {
  User: User;
  Friend: Friend;
  Chatroom: Chatroom;
  Chat: Chat;
  Membership: Membership;
  Notification: Notification;
};
