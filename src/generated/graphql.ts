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
  Date: any,
  DateTime: any,
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
  id?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
};



export type Friend = {
   __typename?: 'Friend',
  id?: Maybe<Scalars['String']>,
  user?: Maybe<User>,
  friend?: Maybe<User>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
};

export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Membership = {
   __typename?: 'Membership',
  id: Scalars['ID'],
  channel: Channel,
  user: User,
  type: MemberType,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
};

export enum MemberType {
  Owner = 'OWNER',
  Member = 'MEMBER'
}

export type Message = {
   __typename?: 'Message',
  id?: Maybe<Scalars['String']>,
  channel?: Maybe<Channel>,
  sender?: Maybe<User>,
  type: Scalars['String'],
  text?: Maybe<Scalars['String']>,
  photoUrl?: Maybe<Scalars['String']>,
  audioUrl?: Maybe<Scalars['String']>,
  readCount?: Maybe<Scalars['Int']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
  deletedAt?: Maybe<Scalars['DateTime']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  signInGoogle: AuthPayload,
  signInFacebook: AuthPayload,
  signInApple: AuthPayload,
  signUp: AuthPayload,
  addPushToken?: Maybe<Notification>,
  updateProfile?: Maybe<User>,
};


export type MutationSignInGoogleArgs = {
  socialUser: SocialUserCreateInput
};


export type MutationSignInFacebookArgs = {
  socialUser: SocialUserCreateInput
};


export type MutationSignInAppleArgs = {
  socialUser: SocialUserCreateInput
};


export type MutationSignUpArgs = {
  user: UserCreateInput
};


export type MutationAddPushTokenArgs = {
  notification: NotificationCreateInput
};


export type MutationUpdateProfileArgs = {
  user: UserUpdateInput
};

export type Notification = {
   __typename?: 'Notification',
  id: Scalars['ID'],
  token?: Maybe<Scalars['String']>,
  device?: Maybe<Scalars['String']>,
  os?: Maybe<Scalars['String']>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type NotificationCreateInput = {
  userId: Scalars['ID'],
  token: Scalars['String'],
  device?: Maybe<Scalars['String']>,
  os?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  users: Array<User>,
  user?: Maybe<User>,
  signInEmail: AuthPayload,
  messages: Array<Message>,
  channels: Array<Channel>,
  friends: Array<Friend>,
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QuerySignInEmailArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};

export type SocialUserCreateInput = {
  socialId: Scalars['String'],
  authType: AuthType,
  email?: Maybe<Scalars['String']>,
  photo?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

export type Subscription = {
   __typename?: 'Subscription',
  userSignedIn?: Maybe<User>,
  userUpdated?: Maybe<User>,
};

export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  photo?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  socialId?: Maybe<Scalars['String']>,
  authType?: Maybe<AuthType>,
  phone?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  notifications?: Maybe<Array<Maybe<Notification>>>,
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
  deletedAt?: Maybe<Scalars['DateTime']>,
};

export type UserCreateInput = {
  email: Scalars['String'],
  password: Scalars['String'],
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

export type UserUpdateInput = {
  id: Scalars['ID'],
  email?: Maybe<Scalars['String']>,
  password: Scalars['String'],
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
  User: ResolverTypeWrapper<User>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Gender: Gender,
  AuthType: AuthType,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Notification: ResolverTypeWrapper<Notification>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  Message: ResolverTypeWrapper<Message>,
  Channel: ResolverTypeWrapper<Channel>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Friend: ResolverTypeWrapper<Friend>,
  Mutation: ResolverTypeWrapper<{}>,
  SocialUserCreateInput: SocialUserCreateInput,
  UserCreateInput: UserCreateInput,
  NotificationCreateInput: NotificationCreateInput,
  UserUpdateInput: UserUpdateInput,
  Subscription: ResolverTypeWrapper<{}>,
  Membership: ResolverTypeWrapper<Membership>,
  MemberType: MemberType,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Date: Scalars['Date'],
  Gender: Gender,
  AuthType: AuthType,
  Boolean: Scalars['Boolean'],
  Notification: Notification,
  DateTime: Scalars['DateTime'],
  AuthPayload: AuthPayload,
  Message: Message,
  Channel: Channel,
  Int: Scalars['Int'],
  Friend: Friend,
  Mutation: {},
  SocialUserCreateInput: SocialUserCreateInput,
  UserCreateInput: UserCreateInput,
  NotificationCreateInput: NotificationCreateInput,
  UserUpdateInput: UserUpdateInput,
  Subscription: {},
  Membership: Membership,
  MemberType: MemberType,
};

export type AuthPayloadResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export type ChannelResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Channel'] = ResolversParentTypes['Channel']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  type?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type FriendResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Friend'] = ResolversParentTypes['Friend']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  friend?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type MembershipResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Membership'] = ResolversParentTypes['Membership']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  channel?: Resolver<ResolversTypes['Channel'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
  type?: Resolver<ResolversTypes['MemberType'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type MessageResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Message'] = ResolversParentTypes['Message']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  channel?: Resolver<Maybe<ResolversTypes['Channel']>, ParentType, ContextType>,
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  text?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  photoUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  audioUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  readCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signInGoogle?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInGoogleArgs, 'socialUser'>>,
  signInFacebook?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInFacebookArgs, 'socialUser'>>,
  signInApple?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInAppleArgs, 'socialUser'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>,
  addPushToken?: Resolver<Maybe<ResolversTypes['Notification']>, ParentType, ContextType, RequireFields<MutationAddPushTokenArgs, 'notification'>>,
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'user'>>,
};

export type NotificationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  signInEmail?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<QuerySignInEmailArgs, 'email' | 'password'>>,
  messages?: Resolver<Array<ResolversTypes['Message']>, ParentType, ContextType>,
  channels?: Resolver<Array<ResolversTypes['Channel']>, ParentType, ContextType>,
  friends?: Resolver<Array<ResolversTypes['Friend']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userSignedIn?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userSignedIn", ParentType, ContextType>,
  userUpdated?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userUpdated", ParentType, ContextType>,
};

export type UserResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>,
  socialId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  authType?: Resolver<Maybe<ResolversTypes['AuthType']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  deletedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = MyContext> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Channel?: ChannelResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  Friend?: FriendResolvers<ContextType>,
  Membership?: MembershipResolvers<ContextType>,
  Message?: MessageResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = MyContext> = Resolvers<ContextType>;
