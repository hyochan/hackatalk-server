import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  DateTime: any,
  Date: any,
};

export type AuthPayload = {
   __typename?: 'AuthPayload',
  token: Scalars['String'],
  user: User,
};

export enum AuthType {
  Email = 'EMAIL',
  Facebook = 'FACEBOOK',
  Google = 'GOOGLE',
  Apple = 'APPLE'
}

export type Channel = {
   __typename?: 'Channel',
  createdAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  memberships?: Maybe<Array<Maybe<Membership>>>,
  messages?: Maybe<Array<Maybe<Message>>>,
  myMembership?: Maybe<Membership>,
  name?: Maybe<Scalars['String']>,
  type?: Maybe<ChannelType>,
  updatedAt: Scalars['DateTime'],
};

export type ChannelInput = {
  type?: Maybe<ChannelType>,
  name?: Maybe<Scalars['String']>,
  friendIds: Array<Scalars['String']>,
};

export enum ChannelType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}



export type Friend = {
   __typename?: 'Friend',
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  friend?: Maybe<User>,
  id: Scalars['ID'],
  updatedAt?: Maybe<Scalars['DateTime']>,
  user?: Maybe<User>,
};

export type FriendSub = {
   __typename?: 'FriendSub',
  user?: Maybe<User>,
  action?: Maybe<FriendSubAction>,
};

export enum FriendSubAction {
  Added = 'ADDED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Membership = {
   __typename?: 'Membership',
  channel?: Maybe<Channel>,
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  type?: Maybe<MemberType>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  user?: Maybe<User>,
  userAlert?: Maybe<Scalars['Boolean']>,
  userMode?: Maybe<UserModeType>,
};

export enum MemberType {
  Owner = 'OWNER',
  Member = 'MEMBER'
}

export type Message = {
   __typename?: 'Message',
  channel?: Maybe<Channel>,
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  filePath?: Maybe<Scalars['String']>,
  id: Scalars['String'],
  picture?: Maybe<Array<Maybe<Photo>>>,
  replies?: Maybe<Array<Maybe<Reply>>>,
  sender?: Maybe<User>,
  text?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addFriend?: Maybe<User>,
  addNotificationToken?: Maybe<Notification>,
  createChannel?: Maybe<Channel>,
  deleteChannel?: Maybe<Scalars['Int']>,
  deleteFriend?: Maybe<User>,
  removeNotificationToken?: Maybe<Scalars['Int']>,
  setOnlineStatus?: Maybe<Scalars['Int']>,
  signInApple: AuthPayload,
  signInEmail: AuthPayload,
  signInFacebook: AuthPayload,
  signInGoogle: AuthPayload,
  signUp: AuthPayload,
  updateChannel?: Maybe<Scalars['Int']>,
  updateProfile?: Maybe<User>,
};


export type MutationAddFriendArgs = {
  friendId: Scalars['ID']
};


export type MutationAddNotificationTokenArgs = {
  notification: NotificationCreateInput
};


export type MutationCreateChannelArgs = {
  channel?: Maybe<ChannelInput>
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID']
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID']
};


export type MutationRemoveNotificationTokenArgs = {
  token: Scalars['String']
};


export type MutationSetOnlineStatusArgs = {
  isOnline?: Maybe<Scalars['Boolean']>
};


export type MutationSignInAppleArgs = {
  socialUser: SocialUserInput
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignInFacebookArgs = {
  socialUser: SocialUserInput
};


export type MutationSignInGoogleArgs = {
  socialUser: SocialUserInput
};


export type MutationSignUpArgs = {
  user: UserInput
};


export type MutationUpdateChannelArgs = {
  channel?: Maybe<ChannelInput>
};


export type MutationUpdateProfileArgs = {
  user: UserInput
};

export type Notification = {
   __typename?: 'Notification',
  createdAt?: Maybe<Scalars['DateTime']>,
  device?: Maybe<Scalars['String']>,
  id: Scalars['ID'],
  os?: Maybe<Scalars['String']>,
  token?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type NotificationCreateInput = {
  token: Scalars['String'],
  device?: Maybe<Scalars['String']>,
  os?: Maybe<Scalars['String']>,
};

export type Photo = {
   __typename?: 'Photo',
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['String'],
  photoURL?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type Query = {
   __typename?: 'Query',
  channels: Array<Channel>,
  findPassword?: Maybe<Scalars['Boolean']>,
  friends: Array<User>,
  me?: Maybe<User>,
  messages: Array<Message>,
  user?: Maybe<User>,
  users: Array<User>,
};


export type QueryFindPasswordArgs = {
  email: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryUsersArgs = {
  user?: Maybe<UserQueryInput>,
  includeUser?: Maybe<Scalars['Boolean']>
};

export type Reply = {
   __typename?: 'Reply',
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  filePath?: Maybe<Scalars['String']>,
  id: Scalars['String'],
  replies?: Maybe<Array<Maybe<Reply>>>,
  sender?: Maybe<User>,
  text?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type SocialUserInput = {
  socialId: Scalars['String'],
  authType: AuthType,
  email?: Maybe<Scalars['String']>,
  photoURL?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  friendChanged?: Maybe<FriendSub>,
  userSignedIn?: Maybe<User>,
  userUpdated?: Maybe<User>,
};


export type SubscriptionFriendChangedArgs = {
  userId: Scalars['ID']
};

export type User = {
   __typename?: 'User',
  authType?: Maybe<AuthType>,
  birthday?: Maybe<Scalars['Date']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
  email?: Maybe<Scalars['String']>,
  gender?: Maybe<Gender>,
  id: Scalars['ID'],
  isOnline?: Maybe<Scalars['Boolean']>,
  lastSignedIn?: Maybe<Scalars['DateTime']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  notifications?: Maybe<Array<Maybe<Notification>>>,
  phone?: Maybe<Scalars['String']>,
  photoURL?: Maybe<Scalars['String']>,
  socialId?: Maybe<Scalars['String']>,
  statusMessage?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  verified?: Maybe<Scalars['Boolean']>,
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
  statusMessage?: Maybe<Scalars['String']>,
};

export enum UserModeType {
  Default = 'DEFAULT',
  Hidden = 'HIDDEN',
  Block = 'BLOCK'
}

export type UserQueryInput = {
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn = (obj: any, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Channel: ResolverTypeWrapper<Channel>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Membership: ResolverTypeWrapper<Membership>,
  MemberType: MemberType,
  User: ResolverTypeWrapper<User>,
  AuthType: AuthType,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Gender: Gender,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Notification: ResolverTypeWrapper<Notification>,
  UserModeType: UserModeType,
  Message: ResolverTypeWrapper<Message>,
  Photo: ResolverTypeWrapper<Photo>,
  Reply: ResolverTypeWrapper<Reply>,
  ChannelType: ChannelType,
  UserQueryInput: UserQueryInput,
  Mutation: ResolverTypeWrapper<{}>,
  NotificationCreateInput: NotificationCreateInput,
  ChannelInput: ChannelInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  SocialUserInput: SocialUserInput,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  UserInput: UserInput,
  Subscription: ResolverTypeWrapper<{}>,
  FriendSub: ResolverTypeWrapper<FriendSub>,
  FriendSubAction: FriendSubAction,
  Friend: ResolverTypeWrapper<Friend>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Channel: Channel,
  DateTime: Scalars['DateTime'],
  ID: Scalars['ID'],
  Membership: Membership,
  MemberType: MemberType,
  User: User,
  AuthType: AuthType,
  Date: Scalars['Date'],
  String: Scalars['String'],
  Gender: Gender,
  Boolean: Scalars['Boolean'],
  Notification: Notification,
  UserModeType: UserModeType,
  Message: Message,
  Photo: Photo,
  Reply: Reply,
  ChannelType: ChannelType,
  UserQueryInput: UserQueryInput,
  Mutation: {},
  NotificationCreateInput: NotificationCreateInput,
  ChannelInput: ChannelInput,
  Int: Scalars['Int'],
  SocialUserInput: SocialUserInput,
  AuthPayload: AuthPayload,
  UserInput: UserInput,
  Subscription: {},
  FriendSub: FriendSub,
  FriendSubAction: FriendSubAction,
  Friend: Friend,
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type ChannelResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  memberships?: Resolver<Maybe<Array<Maybe<ResolversTypes['Membership']>>>, ParentType, ContextType>,
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>,
  myMembership?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['ChannelType']>, ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FriendResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type FriendSubResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendSub'] = ResolversParentTypes['FriendSub']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  action?: Resolver<Maybe<ResolversTypes['FriendSubAction']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type MembershipResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['MemberType']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  userAlert?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  userMode?: Resolver<Maybe<ResolversTypes['UserModeType']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  picture?: Resolver<Maybe<Array<Maybe<ResolversTypes['Photo']>>>, ParentType, ContextType>,
  replies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reply']>>>, ParentType, ContextType>,
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'friendId'>>,
  addNotificationToken?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationAddNotificationTokenArgs, 'notification'>>,
  createChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, MutationCreateChannelArgs>,
  deleteChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'channelId'>>,
  deleteFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteFriendArgs, 'friendId'>>,
  removeNotificationToken?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveNotificationTokenArgs, 'token'>>,
  setOnlineStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationSetOnlineStatusArgs>,
  signInApple?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInAppleArgs, 'socialUser'>>,
  signInEmail?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInEmailArgs, 'email' | 'password'>>,
  signInFacebook?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInFacebookArgs, 'socialUser'>>,
  signInGoogle?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInGoogleArgs, 'socialUser'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>,
  updateChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationUpdateChannelArgs>,
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>,
};

export type NotificationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type PhotoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>,
  findPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<QueryFindPasswordArgs, 'email'>>,
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType, QueryUsersArgs>,
};

export type ReplyResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  replies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reply']>>>, ParentType, ContextType>,
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  friendChanged?: SubscriptionResolver<Maybe<ResolversTypes['FriendSub']>, "friendChanged", ParentType, ContextType, RequireFields<SubscriptionFriendChangedArgs, 'userId'>>,
  userSignedIn?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userSignedIn", ParentType, ContextType>,
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType>,
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  authType?: Resolver<Maybe<ResolversTypes['AuthType']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  isOnline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  lastSignedIn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  socialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  statusMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn,
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Channel?: ChannelResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  Friend?: FriendResolvers<ContextType>,
  FriendSub?: FriendSubResolvers<ContextType>,
  Membership?: MembershipResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Photo?: PhotoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Reply?: ReplyResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
