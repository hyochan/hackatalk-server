import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { MyContext } from '../context';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Upload: any;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token: Scalars['String'];
  user: User;
};

export enum AuthType {
  Email = 'email',
  Facebook = 'facebook',
  Google = 'google',
  Apple = 'apple'
}

export type Channel = {
  __typename?: 'Channel';
  id: Scalars['ID'];
  type?: Maybe<ChannelType>;
  name?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Message>>>;
  memberships?: Maybe<Array<Maybe<Membership>>>;
  myMembership?: Maybe<Membership>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type ChannelInput = {
  type?: Maybe<ChannelType>;
  name?: Maybe<Scalars['String']>;
  friendIds: Array<Scalars['String']>;
};

export enum ChannelType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}



export type File = {
  __typename?: 'File';
  filename: Scalars['String'];
  mimetype: Scalars['String'];
  encoding: Scalars['String'];
};

export type Friend = {
  __typename?: 'Friend';
  id: Scalars['ID'];
  user?: Maybe<User>;
  friend?: Maybe<User>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type FriendPayload = {
  __typename?: 'FriendPayload';
  user: User;
  added?: Maybe<Scalars['Boolean']>;
  deleted?: Maybe<Scalars['Int']>;
};

export type FriendSub = {
  __typename?: 'FriendSub';
  user?: Maybe<User>;
  action?: Maybe<FriendSubAction>;
};

export enum FriendSubAction {
  Added = 'ADDED',
  Updated = 'UPDATED',
  Deleted = 'DELETED'
}

export type Gallery = {
  __typename?: 'Gallery';
  id: Scalars['ID'];
  photoURL: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Membership = {
  __typename?: 'Membership';
  id: Scalars['ID'];
  channel?: Maybe<Channel>;
  user?: Maybe<User>;
  type?: Maybe<MemberType>;
  userAlert?: Maybe<Scalars['Boolean']>;
  userMode?: Maybe<UserModeType>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export enum MemberType {
  Owner = 'OWNER',
  Member = 'MEMBER'
}

export type Message = {
  __typename?: 'Message';
  id: Scalars['String'];
  channel?: Maybe<Channel>;
  sender?: Maybe<User>;
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  picture?: Maybe<Array<Maybe<Photo>>>;
  filePath?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  reactions?: Maybe<Array<Maybe<Reaction>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type MessagePayload = {
  __typename?: 'MessagePayload';
  channelId: Scalars['String'];
  message?: Maybe<Message>;
};

export type Mutation = {
  __typename?: 'Mutation';
  signInEmail: AuthPayload;
  signInWithSocialAccount: AuthPayload;
  signInWithFacebook: AuthPayload;
  signUp: AuthPayload;
  findPassword?: Maybe<Scalars['Boolean']>;
  sendVerification?: Maybe<Scalars['Boolean']>;
  addNotificationToken?: Maybe<Notification>;
  removeNotificationToken?: Maybe<Scalars['Int']>;
  updateProfile?: Maybe<User>;
  addFriend?: Maybe<FriendPayload>;
  deleteFriend?: Maybe<FriendPayload>;
  /** `friendIds` in Channel should exclude userid. */
  createChannel?: Maybe<Channel>;
  updateChannel?: Maybe<Scalars['Int']>;
  deleteChannel?: Maybe<Scalars['Int']>;
  /**
   * Create message and return channelId when meessage has successfully sent.
   * Do not pass current userId inside `users`.
   */
  createMessage?: Maybe<MessagePayload>;
  setOnlineStatus?: Maybe<Scalars['Int']>;
  changeEmailPassword?: Maybe<Scalars['Boolean']>;
  createGallery?: Maybe<Gallery>;
  updateGallery?: Maybe<Scalars['Int']>;
  deleteGallery?: Maybe<Scalars['Int']>;
  singleUpload: Scalars['String'];
  createReaction?: Maybe<Reaction>;
  deleteReaction?: Maybe<Scalars['Int']>;
};


export type MutationSignInEmailArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationSignInWithSocialAccountArgs = {
  socialUser: SocialUserInput;
};


export type MutationSignInWithFacebookArgs = {
  accessToken: Scalars['String'];
};


export type MutationSignUpArgs = {
  user: UserInput;
};


export type MutationFindPasswordArgs = {
  email: Scalars['String'];
};


export type MutationSendVerificationArgs = {
  email: Scalars['String'];
};


export type MutationAddNotificationTokenArgs = {
  notification: NotificationCreateInput;
};


export type MutationRemoveNotificationTokenArgs = {
  token: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  user: UserProfileInput;
};


export type MutationAddFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationDeleteFriendArgs = {
  friendId: Scalars['ID'];
};


export type MutationCreateChannelArgs = {
  channel?: Maybe<ChannelInput>;
};


export type MutationUpdateChannelArgs = {
  channel?: Maybe<ChannelInput>;
};


export type MutationDeleteChannelArgs = {
  channelId: Scalars['ID'];
};


export type MutationCreateMessageArgs = {
  message: Scalars['String'];
  channelId: Scalars['String'];
};


export type MutationSetOnlineStatusArgs = {
  isOnline?: Maybe<Scalars['Boolean']>;
};


export type MutationChangeEmailPasswordArgs = {
  password: Scalars['String'];
  newPassword: Scalars['String'];
};


export type MutationCreateGalleryArgs = {
  photoURL: Scalars['String'];
};


export type MutationUpdateGalleryArgs = {
  galleryId: Scalars['ID'];
  photoURL: Scalars['String'];
};


export type MutationDeleteGalleryArgs = {
  galleryId: Scalars['ID'];
};


export type MutationSingleUploadArgs = {
  file: Scalars['Upload'];
  dir?: Maybe<Scalars['String']>;
};


export type MutationCreateReactionArgs = {
  messageId: Scalars['ID'];
  type: Scalars['String'];
};


export type MutationDeleteReactionArgs = {
  reactionId: Scalars['ID'];
};

export type Notification = {
  __typename?: 'Notification';
  id: Scalars['ID'];
  token?: Maybe<Scalars['String']>;
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
};

export type NotificationCreateInput = {
  token: Scalars['String'];
  device?: Maybe<Scalars['String']>;
  os?: Maybe<Scalars['String']>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  startCursor?: Maybe<Scalars['String']>;
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage?: Maybe<Scalars['Boolean']>;
  hasPreviousPage?: Maybe<Scalars['Boolean']>;
};

export type Photo = {
  __typename?: 'Photo';
  id: Scalars['String'];
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Query = {
  __typename?: 'Query';
  /**
   * If filter is true, it will filter user with email, nickname or name.
   * You can add pagination with first and after args.
   */
  users?: Maybe<UsersConnection>;
  user?: Maybe<User>;
  me?: Maybe<User>;
  messages: Array<Message>;
  channels: Array<Channel>;
  friends: Array<User>;
  galleries: Array<Gallery>;
};


export type QueryUsersArgs = {
  user?: Maybe<UserQueryInput>;
  includeUser?: Maybe<Scalars['Boolean']>;
  filter?: Maybe<Scalars['Boolean']>;
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['String']>;
  after?: Maybe<Scalars['String']>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryGalleriesArgs = {
  userId: Scalars['String'];
};

export type Reaction = {
  __typename?: 'Reaction';
  id: Scalars['ID'];
  type?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type Reply = {
  __typename?: 'Reply';
  id: Scalars['String'];
  sender?: Maybe<User>;
  type?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  filePath?: Maybe<Scalars['String']>;
  replies?: Maybe<Array<Maybe<Reply>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type SocialUserInput = {
  socialId: Scalars['String'];
  authType: AuthType;
  email?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  userSignedIn?: Maybe<User>;
  userUpdated?: Maybe<User>;
  friendChanged?: Maybe<FriendSub>;
};


export type SubscriptionUserSignedInArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionUserUpdatedArgs = {
  userId: Scalars['ID'];
};


export type SubscriptionFriendChangedArgs = {
  userId: Scalars['ID'];
};


export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  socialId?: Maybe<Scalars['String']>;
  authType?: Maybe<AuthType>;
  phone?: Maybe<Scalars['String']>;
  verified?: Maybe<Scalars['Boolean']>;
  statusMessage?: Maybe<Scalars['String']>;
  isOnline?: Maybe<Scalars['Boolean']>;
  lastSignedIn?: Maybe<Scalars['DateTime']>;
  notifications?: Maybe<Array<Maybe<Notification>>>;
  createdAt?: Maybe<Scalars['DateTime']>;
  updatedAt?: Maybe<Scalars['DateTime']>;
  deletedAt?: Maybe<Scalars['DateTime']>;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  node?: Maybe<User>;
  cursor?: Maybe<Scalars['String']>;
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export enum UserModeType {
  Default = 'DEFAULT',
  Hidden = 'HIDDEN',
  Block = 'BLOCK'
}

export type UserProfileInput = {
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
  thumbURL?: Maybe<Scalars['String']>;
  photoURL?: Maybe<Scalars['String']>;
  statusMessage?: Maybe<Scalars['String']>;
};

export type UserQueryInput = {
  email?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nickname?: Maybe<Scalars['String']>;
  birthday?: Maybe<Scalars['Date']>;
  gender?: Maybe<Gender>;
  phone?: Maybe<Scalars['String']>;
};

/**
 * Simple wrapper around our list of launches that contains a cursor to the
 * last item in the list. Pass this cursor to the launches query to fetch results
 * after these.
 */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  totalCount?: Maybe<Scalars['Int']>;
  edges?: Maybe<Array<Maybe<UserEdge>>>;
  pageInfo?: Maybe<PageInfo>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Query: ResolverTypeWrapper<{}>;
  UserQueryInput: UserQueryInput;
  String: ResolverTypeWrapper<Scalars['String']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  Gender: Gender;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  UsersConnection: ResolverTypeWrapper<UsersConnection>;
  UserEdge: ResolverTypeWrapper<UserEdge>;
  User: ResolverTypeWrapper<User>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  AuthType: AuthType;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Notification: ResolverTypeWrapper<Notification>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Message: ResolverTypeWrapper<Message>;
  Channel: ResolverTypeWrapper<Channel>;
  ChannelType: ChannelType;
  Membership: ResolverTypeWrapper<Membership>;
  MemberType: MemberType;
  UserModeType: UserModeType;
  Photo: ResolverTypeWrapper<Photo>;
  Reply: ResolverTypeWrapper<Reply>;
  Reaction: ResolverTypeWrapper<Reaction>;
  Gallery: ResolverTypeWrapper<Gallery>;
  Mutation: ResolverTypeWrapper<{}>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  SocialUserInput: SocialUserInput;
  UserInput: UserInput;
  NotificationCreateInput: NotificationCreateInput;
  UserProfileInput: UserProfileInput;
  FriendPayload: ResolverTypeWrapper<FriendPayload>;
  ChannelInput: ChannelInput;
  MessagePayload: ResolverTypeWrapper<MessagePayload>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Subscription: ResolverTypeWrapper<{}>;
  FriendSub: ResolverTypeWrapper<FriendSub>;
  FriendSubAction: FriendSubAction;
  Friend: ResolverTypeWrapper<Friend>;
  File: ResolverTypeWrapper<File>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  UserQueryInput: UserQueryInput;
  String: Scalars['String'];
  Date: Scalars['Date'];
  Gender: Gender;
  Boolean: Scalars['Boolean'];
  Int: Scalars['Int'];
  UsersConnection: UsersConnection;
  UserEdge: UserEdge;
  User: User;
  ID: Scalars['ID'];
  AuthType: AuthType;
  DateTime: Scalars['DateTime'];
  Notification: Notification;
  PageInfo: PageInfo;
  Message: Message;
  Channel: Channel;
  ChannelType: ChannelType;
  Membership: Membership;
  MemberType: MemberType;
  UserModeType: UserModeType;
  Photo: Photo;
  Reply: Reply;
  Reaction: Reaction;
  Gallery: Gallery;
  Mutation: {};
  AuthPayload: AuthPayload;
  SocialUserInput: SocialUserInput;
  UserInput: UserInput;
  NotificationCreateInput: NotificationCreateInput;
  UserProfileInput: UserProfileInput;
  FriendPayload: FriendPayload;
  ChannelInput: ChannelInput;
  MessagePayload: MessagePayload;
  Upload: Scalars['Upload'];
  Subscription: {};
  FriendSub: FriendSub;
  FriendSubAction: FriendSubAction;
  Friend: Friend;
  File: File;
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ChannelResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['ChannelType']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  messages?: Resolver<Maybe<Array<Maybe<ResolversTypes['Message']>>>, ParentType, ContextType>;
  memberships?: Resolver<Maybe<Array<Maybe<ResolversTypes['Membership']>>>, ParentType, ContextType>;
  myMembership?: Resolver<Maybe<ResolversTypes['Membership']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type FileResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['File'] = ResolversParentTypes['File']> = {
  filename?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  mimetype?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  encoding?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FriendResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FriendPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendPayload'] = ResolversParentTypes['FriendPayload']> = {
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  added?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  deleted?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type FriendSubResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['FriendSub'] = ResolversParentTypes['FriendSub']> = {
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  action?: Resolver<Maybe<ResolversTypes['FriendSubAction']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type GalleryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Gallery'] = ResolversParentTypes['Gallery']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  photoURL?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MembershipResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['MemberType']>, ParentType, ContextType>;
  userAlert?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  userMode?: Resolver<Maybe<ResolversTypes['UserModeType']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  picture?: Resolver<Maybe<Array<Maybe<ResolversTypes['Photo']>>>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  replies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reply']>>>, ParentType, ContextType>;
  reactions?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reaction']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MessagePayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['MessagePayload'] = ResolversParentTypes['MessagePayload']> = {
  channelId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['Message']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signInEmail?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInEmailArgs, 'email' | 'password'>>;
  signInWithSocialAccount?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInWithSocialAccountArgs, 'socialUser'>>;
  signInWithFacebook?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInWithFacebookArgs, 'accessToken'>>;
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>;
  findPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationFindPasswordArgs, 'email'>>;
  sendVerification?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationSendVerificationArgs, 'email'>>;
  addNotificationToken?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationAddNotificationTokenArgs, 'notification'>>;
  removeNotificationToken?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationRemoveNotificationTokenArgs, 'token'>>;
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>;
  addFriend?: Resolver<Maybe<ResolversTypes['FriendPayload']>, ParentType, ContextType, RequireFields<MutationAddFriendArgs, 'friendId'>>;
  deleteFriend?: Resolver<Maybe<ResolversTypes['FriendPayload']>, ParentType, ContextType, RequireFields<MutationDeleteFriendArgs, 'friendId'>>;
  createChannel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType, RequireFields<MutationCreateChannelArgs, never>>;
  updateChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationUpdateChannelArgs, never>>;
  deleteChannel?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteChannelArgs, 'channelId'>>;
  createMessage?: Resolver<Maybe<ResolversTypes['MessagePayload']>, ParentType, ContextType, RequireFields<MutationCreateMessageArgs, 'message' | 'channelId'>>;
  setOnlineStatus?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationSetOnlineStatusArgs, never>>;
  changeEmailPassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationChangeEmailPasswordArgs, 'password' | 'newPassword'>>;
  createGallery?: Resolver<Maybe<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<MutationCreateGalleryArgs, 'photoURL'>>;
  updateGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationUpdateGalleryArgs, 'galleryId' | 'photoURL'>>;
  deleteGallery?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteGalleryArgs, 'galleryId'>>;
  singleUpload?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationSingleUploadArgs, 'file'>>;
  createReaction?: Resolver<Maybe<ResolversTypes['Reaction']>, ParentType, ContextType, RequireFields<MutationCreateReactionArgs, 'messageId' | 'type'>>;
  deleteReaction?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType, RequireFields<MutationDeleteReactionArgs, 'reactionId'>>;
};

export type NotificationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PageInfoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  hasPreviousPage?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type PhotoResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Photo'] = ResolversParentTypes['Photo']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Maybe<ResolversTypes['UsersConnection']>, ParentType, ContextType, RequireFields<QueryUsersArgs, never>>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  me?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>;
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>;
  friends?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>;
  galleries?: Resolver<Array<ResolversTypes['Gallery']>, ParentType, ContextType, RequireFields<QueryGalleriesArgs, 'userId'>>;
};

export type ReactionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reaction'] = ResolversParentTypes['Reaction']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type ReplyResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  filePath?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  replies?: Resolver<Maybe<Array<Maybe<ResolversTypes['Reply']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userSignedIn?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userSignedIn", ParentType, ContextType, RequireFields<SubscriptionUserSignedInArgs, 'userId'>>;
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType, RequireFields<SubscriptionUserUpdatedArgs, 'userId'>>;
  friendChanged?: SubscriptionResolver<Maybe<ResolversTypes['FriendSub']>, "friendChanged", ParentType, ContextType, RequireFields<SubscriptionFriendChangedArgs, 'userId'>>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  thumbURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  photoURL?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>;
  socialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  authType?: Resolver<Maybe<ResolversTypes['AuthType']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  statusMessage?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  isOnline?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  lastSignedIn?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UserEdgeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  node?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  cursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type UsersConnectionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['UsersConnection'] = ResolversParentTypes['UsersConnection']> = {
  totalCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  edges?: Resolver<Maybe<Array<Maybe<ResolversTypes['UserEdge']>>>, ParentType, ContextType>;
  pageInfo?: Resolver<Maybe<ResolversTypes['PageInfo']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Channel?: ChannelResolvers<ContextType>;
  Date?: GraphQLScalarType;
  DateTime?: GraphQLScalarType;
  File?: FileResolvers<ContextType>;
  Friend?: FriendResolvers<ContextType>;
  FriendPayload?: FriendPayloadResolvers<ContextType>;
  FriendSub?: FriendSubResolvers<ContextType>;
  Gallery?: GalleryResolvers<ContextType>;
  Membership?: MembershipResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  MessagePayload?: MessagePayloadResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Notification?: NotificationResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Photo?: PhotoResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Reaction?: ReactionResolvers<ContextType>;
  Reply?: ReplyResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  UsersConnection?: UsersConnectionResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
