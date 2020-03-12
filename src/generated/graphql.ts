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
  Upload: any,
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



export type File = {
   __typename?: 'File',
  encoding: Scalars['String'],
  filename: Scalars['String'],
  mimetype: Scalars['String'],
};

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

export type Gallery = {
   __typename?: 'Gallery',
  createdAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
  id: Scalars['ID'],
  photoURL: Scalars['String'],
  updatedAt: Scalars['DateTime'],
};

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

export type MessagePayload = {
   __typename?: 'MessagePayload',
  channelId: Scalars['String'],
  message?: Maybe<Message>,
};

export type Mutation = {
   __typename?: 'Mutation',
  addFriend?: Maybe<User>,
  addNotificationToken?: Maybe<Notification>,
  changeEmailPassword?: Maybe<Scalars['Boolean']>,
  createChannel?: Maybe<Channel>,
  createGallery?: Maybe<Gallery>,
  /** 
 * Create message and return channelId when meessage has successfully sent.
   * Do not pass current userId inside `users`.
 */
  createMessage?: Maybe<MessagePayload>,
  deleteChannel?: Maybe<Scalars['Int']>,
  deleteFriend?: Maybe<User>,
  deleteGallery?: Maybe<Scalars['Int']>,
  findPassword?: Maybe<Scalars['Boolean']>,
  removeNotificationToken?: Maybe<Scalars['Int']>,
  sendVerification?: Maybe<Scalars['Boolean']>,
  setOnlineStatus?: Maybe<Scalars['Int']>,
  signInEmail: AuthPayload,
  signInWithSocialAccount: AuthPayload,
  signUp: AuthPayload,
  singleUpload: Scalars['String'],
  updateChannel?: Maybe<Scalars['Int']>,
  updateGallery?: Maybe<Scalars['Int']>,
  updateProfile?: Maybe<User>,
};


export type MutationAddFriendArgs = {
  friendId: Scalars['ID']
};


export type MutationAddNotificationTokenArgs = {
  notification: NotificationCreateInput
};


export type MutationChangeEmailPasswordArgs = {
  password: Scalars['String'],
  newPassword: Scalars['String']
};


export type MutationCreateChannelArgs = {
  channel?: Maybe<ChannelInput>
};


export type MutationCreateGalleryArgs = {
  photoURL: Scalars['String']
};


export type MutationCreateMessageArgs = {
  users: Array<Scalars['String']>,
  message: Scalars['String'],
  channelId?: Maybe<Scalars['String']>
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID']
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID']
};


export type MutationDeleteGalleryArgs = {
  galleryId: Scalars['ID']
};


export type MutationFindPasswordArgs = {
  email: Scalars['String']
};


export type MutationRemoveNotificationTokenArgs = {
  token: Scalars['String']
};


export type MutationSendVerificationArgs = {
  email: Scalars['String']
};


export type MutationSetOnlineStatusArgs = {
  isOnline?: Maybe<Scalars['Boolean']>
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationSignInWithSocialAccountArgs = {
  socialUser: SocialUserInput
};


export type MutationSignUpArgs = {
  user: UserInput
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'],
  dir?: Maybe<Scalars['String']>
};


export type MutationUpdateChannelArgs = {
  channel?: Maybe<ChannelInput>
};


export type MutationUpdateGalleryArgs = {
  galleryId: Scalars['ID'],
  photoURL: Scalars['String']
};


export type MutationUpdateProfileArgs = {
  user: UserProfileInput
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

/** Information about pagination in a connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  startCursor?: Maybe<Scalars['String']>,
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage?: Maybe<Scalars['Boolean']>,
  hasPreviousPage?: Maybe<Scalars['Boolean']>,
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
  friends: Array<User>,
  galleries: Array<Gallery>,
  me?: Maybe<User>,
  messages: Array<Message>,
  user?: Maybe<User>,
  /** 
 * If filter is true, it will filter user with email, nickname or name.
   * You can add pagination with first and after args.
 */
  users?: Maybe<UsersConnection>,
};


export type QueryGalleriesArgs = {
  userId: Scalars['String']
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryUsersArgs = {
  user?: Maybe<UserQueryInput>,
  includeUser?: Maybe<Scalars['Boolean']>,
  filter?: Maybe<Scalars['Boolean']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>
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

export type UserEdge = {
   __typename?: 'UserEdge',
  node?: Maybe<User>,
  cursor?: Maybe<Scalars['String']>,
};

export type UserInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
  thumbURL?: Maybe<Scalars['String']>,
  photoURL?: Maybe<Scalars['String']>,
  statusMessage?: Maybe<Scalars['String']>,
};

export enum UserModeType {
  Default = 'DEFAULT',
  Hidden = 'HIDDEN',
  Block = 'BLOCK'
}

export type UserProfileInput = {
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
  statusMessage?: Maybe<Scalars['String']>,
};

export type UserQueryInput = {
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

/** 
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type UsersConnection = {
   __typename?: 'UsersConnection',
  totalCount?: Maybe<Scalars['Int']>,
  edges?: Maybe<Array<Maybe<UserEdge>>>,
  pageInfo?: Maybe<PageInfo>,
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

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

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
  Gallery: ResolverTypeWrapper<Gallery>,
  UserQueryInput: UserQueryInput,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  UsersConnection: ResolverTypeWrapper<UsersConnection>,
  UserEdge: ResolverTypeWrapper<UserEdge>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Mutation: ResolverTypeWrapper<{}>,
  NotificationCreateInput: NotificationCreateInput,
  ChannelInput: ChannelInput,
  MessagePayload: ResolverTypeWrapper<MessagePayload>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  SocialUserInput: SocialUserInput,
  UserInput: UserInput,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  UserProfileInput: UserProfileInput,
  Subscription: ResolverTypeWrapper<{}>,
  FriendSub: ResolverTypeWrapper<FriendSub>,
  FriendSubAction: FriendSubAction,
  Friend: ResolverTypeWrapper<Friend>,
  File: ResolverTypeWrapper<File>,
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
  Gallery: Gallery,
  UserQueryInput: UserQueryInput,
  Int: Scalars['Int'],
  UsersConnection: UsersConnection,
  UserEdge: UserEdge,
  PageInfo: PageInfo,
  Mutation: {},
  NotificationCreateInput: NotificationCreateInput,
  ChannelInput: ChannelInput,
  MessagePayload: MessagePayload,
  AuthPayload: AuthPayload,
  SocialUserInput: SocialUserInput,
  UserInput: UserInput,
  Upload: Scalars['Upload'],
  UserProfileInput: UserProfileInput,
  Subscription: {},
  FriendSub: FriendSub,
  FriendSubAction: FriendSubAction,
  Friend: Friend,
  File: File,
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FriendResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type FriendSubResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendSub'] = ResolversParentTypes['FriendSub']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  action?: Resolver<Maybe<ResolversTypes['FriendSubAction']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type GalleryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Gallery'] = ResolversParentTypes['Gallery']> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  photoURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MessagePayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MessagePayload'] = ResolversParentTypes['MessagePayload']> = {
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'friendId'>>,
  addNotificationToken?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationAddNotificationTokenArgs, 'notification'>>,
  changeEmailPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeEmailPasswordArgs, 'password' | 'newPassword'>>,
  createChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, MutationCreateChannelArgs>,
  createGallery?: Resolver<Maybe<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<MutationCreateGalleryArgs, 'photoURL'>>,
  createMessage?: Resolver<Maybe<ResolversTypes['MessagePayload']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'users' | 'message'>>,
  deleteChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'channelId'>>,
  deleteFriend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationDeleteFriendArgs, 'friendId'>>,
  deleteGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteGalleryArgs, 'galleryId'>>,
  findPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationFindPasswordArgs, 'email'>>,
  removeNotificationToken?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveNotificationTokenArgs, 'token'>>,
  sendVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationArgs, 'email'>>,
  setOnlineStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationSetOnlineStatusArgs>,
  signInEmail?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInEmailArgs, 'email' | 'password'>>,
  signInWithSocialAccount?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInWithSocialAccountArgs, 'socialUser'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>,
  singleUpload?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSingleUploadArgs, 'file'>>,
  updateChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, MutationUpdateChannelArgs>,
  updateGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationUpdateGalleryArgs, 'galleryId' | 'photoURL'>>,
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>,
};

export type NotificationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PageInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PhotoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>,
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  galleries?: Resolver<Array<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<QueryGalleriesArgs, 'userId'>>,
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  users?: Resolver<Maybe<ResolversTypes['UsersConnection']>, ParentType, ContextType, QueryUsersArgs>,
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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  friendChanged?: SubscriptionResolver<Maybe<ResolversTypes['FriendSub']>, "friendChanged", ParentType, ContextType, RequireFields<SubscriptionFriendChangedArgs, 'userId'>>,
  userSignedIn?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userSignedIn", ParentType, ContextType>,
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

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
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UserEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type UsersConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']> = {
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>, ParentType, ContextType>,
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Channel?: ChannelResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  File?: FileResolvers<ContextType>,
  Friend?: FriendResolvers<ContextType>,
  FriendSub?: FriendSubResolvers<ContextType>,
  Gallery?: GalleryResolvers<ContextType>,
  Membership?: MembershipResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  MessagePayload?: MessagePayloadResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Photo?: PhotoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Reply?: ReplyResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
  UserEdge?: UserEdgeResolvers<ContextType>,
  UsersConnection?: UsersConnectionResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
