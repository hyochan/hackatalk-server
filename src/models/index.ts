import Channel from './Channel';
import Friend from './Friend';
import Membership from './Membership';
import Message from './Message';
import Notification from './Notification';
import User from './User';

export default {
  User,
  Friend,
  Channel,
  Message,
  Membership,
  Notification,
};

export interface ModelType {
  User: User;
  Friend: Friend;
  Channel: Channel;
  Message: Message;
  Membership: Membership;
  Notification: Notification;
};
