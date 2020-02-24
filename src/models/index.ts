import Channel, { ChannelModelStatic } from './Channel';
import Friend, { FriendModelStatic } from './Friend';
import Gallery, { GalleryModelStatic } from './Gallery';
import Membership, { MembershipModelStatic } from './Membership';
import Message, { MessageModelStatic } from './Message';
import Notification, { NotificationModelStatic } from './Notification';
import Photo, { PhotoModelStatic } from './Photo';
import Reply, { ReplyModelStatic } from './Reply';
import User, { UserModelStatic } from './User';
import Reaction, { ReactionModelStatic } from './Reaction';

export default {
  User,
  Friend,
  Channel,
  Message,
  Membership,
  Notification,
  Photo,
  Reply,
  Gallery,
  Reaction,
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
  Gallery: GalleryModelStatic;
  Reaction: ReactionModelStatic;
};
