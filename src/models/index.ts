import Channel, { ChannelModelStatic } from './Channel';
import Friend, { FriendModelStatic } from './Friend';
import Membership, { MembershipModelStatic } from './Membership';
import Message, { MessageModelStatic } from './Message';
import Notification, { NotificationModelStatic } from './Notification';
import Photo, { PhotoModelStatic } from './Photo';
import Reply, { ReplyModelStatic } from './Reply';
import User, { UserModelStatic } from './User';

export default {
  User,
  Friend,
  Channel,
  Message,
  Membership,
  Notification,
  Photo,
  Reply,
};

export interface ModelType {
  User: UserModelStatic;
  Friend: FriendModelStatic;
  Channel: ChannelModelStatic;
  Message: MessageModelStatic;
  Reply: ReplyModelStatic;
  Membership: MembershipModelStatic;
  Notification: NotificationModelStatic;
  Photo: PhotoModelStatic;
};
