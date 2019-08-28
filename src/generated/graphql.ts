import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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



export enum Gender {
  Male = 'MALE',
  Female = 'FEMALE'
}

export type Mutation = {
  __typename?: 'Mutation',
  signInGoogle: AuthPayload,
  signInFacebook: AuthPayload,
  signUp: AuthPayload,
  addPushToken: Notification,
};


export type MutationSignInGoogleArgs = {
  socialUser: SocialUserCreateInput
};


export type MutationSignInFacebookArgs = {
  socialUser: SocialUserCreateInput
};


export type MutationSignUpArgs = {
  user: UserCreateInput
};


export type MutationAddPushTokenArgs = {
  notification: NotificationCreateInput
};

export type Notification = {
  __typename?: 'Notification',
  id: Scalars['ID'],
  token: Scalars['String'],
  device?: Maybe<Scalars['String']>,
  os?: Maybe<Scalars['String']>,
  createdAt: Scalars['DateTime'],
  updatedAt: Scalars['DateTime'],
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
  reviews: Array<Review>,
  review?: Maybe<Review>,
};


export type QueryUserArgs = {
  id: Scalars['ID']
};


export type QueryReviewArgs = {
  id: Scalars['ID']
};

export type Review = {
  __typename?: 'Review',
  id: Scalars['ID'],
  title?: Maybe<Scalars['String']>,
  content?: Maybe<Scalars['String']>,
  rating: Scalars['Float'],
  createdAt?: Maybe<Scalars['DateTime']>,
  updatedAt?: Maybe<Scalars['DateTime']>,
};

export type SocialUserCreateInput = {
  social: Scalars['String'],
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  photo?: Maybe<Scalars['String']>,
  name?: Maybe<Scalars['String']>,
  nickname?: Maybe<Scalars['String']>,
  birthday?: Maybe<Scalars['Date']>,
  gender?: Maybe<Gender>,
  phone?: Maybe<Scalars['String']>,
};

export type Subscription = {
  __typename?: 'Subscription',
  userAdded?: Maybe<User>,
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
  phone?: Maybe<Scalars['String']>,
  social?: Maybe<Scalars['String']>,
  verified?: Maybe<Scalars['Boolean']>,
  notifications?: Maybe<Array<Maybe<Notification>>>,
  reviews?: Maybe<Array<Maybe<Review>>>,
  created: Scalars['DateTime'],
  updated: Scalars['DateTime'],
  deleted?: Maybe<Scalars['DateTime']>,
};

export type UserCreateInput = {
  email?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Notification: ResolverTypeWrapper<Notification>,
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>,
  Review: ResolverTypeWrapper<Review>,
  Float: ResolverTypeWrapper<Scalars['Float']>,
  Mutation: ResolverTypeWrapper<{}>,
  SocialUserCreateInput: SocialUserCreateInput,
  AuthPayload: ResolverTypeWrapper<AuthPayload>,
  UserCreateInput: UserCreateInput,
  NotificationCreateInput: NotificationCreateInput,
  Subscription: ResolverTypeWrapper<{}>,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  User: User,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Date: Scalars['Date'],
  Gender: Gender,
  Boolean: Scalars['Boolean'],
  Notification: Notification,
  DateTime: Scalars['DateTime'],
  Review: Review,
  Float: Scalars['Float'],
  Mutation: {},
  SocialUserCreateInput: SocialUserCreateInput,
  AuthPayload: AuthPayload,
  UserCreateInput: UserCreateInput,
  NotificationCreateInput: NotificationCreateInput,
  Subscription: {},
};

export type AuthPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthPayload'] = ResolversParentTypes['AuthPayload']> = {
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>,
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date'
}

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  signInGoogle?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInGoogleArgs, 'socialUser'>>,
  signInFacebook?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignInFacebookArgs, 'socialUser'>>,
  signUp?: Resolver<ResolversTypes['AuthPayload'], ParentType, ContextType, RequireFields<MutationSignUpArgs, 'user'>>,
  addPushToken?: Resolver<ResolversTypes['Notification'], ParentType, ContextType, RequireFields<MutationAddPushTokenArgs, 'notification'>>,
};

export type NotificationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Notification'] = ResolversParentTypes['Notification']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  token?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  device?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  os?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  users?: Resolver<Array<ResolversTypes['User']>, ParentType, ContextType>,
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>,
  reviews?: Resolver<Array<ResolversTypes['Review']>, ParentType, ContextType>,
  review?: Resolver<Maybe<ResolversTypes['Review']>, ParentType, ContextType, RequireFields<QueryReviewArgs, 'id'>>,
};

export type ReviewResolvers<ContextType = any, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  content?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  rating?: Resolver<ResolversTypes['Float'], ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  userAdded?: SubscriptionResolver<Maybe<ResolversTypes['User']>, "userAdded", ParentType, ContextType>,
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  nickname?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  photo?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  birthday?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>,
  gender?: Resolver<Maybe<ResolversTypes['Gender']>, ParentType, ContextType>,
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  social?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  verified?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  notifications?: Resolver<Maybe<Array<Maybe<ResolversTypes['Notification']>>>, ParentType, ContextType>,
  reviews?: Resolver<Maybe<Array<Maybe<ResolversTypes['Review']>>>, ParentType, ContextType>,
  created?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  updated?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>,
  deleted?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>,
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>,
  Date?: GraphQLScalarType,
  DateTime?: GraphQLScalarType,
  Mutation?: MutationResolvers<ContextType>,
  Notification?: NotificationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Review?: ReviewResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
