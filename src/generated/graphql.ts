import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AuthPayload = {
  __typename?: "AuthPayload";
  token: Scalars["String"];
  user: User;
};

export type Message = {
  __typename?: "Message";
  id: Scalars["Int"];
  text: Scalars["String"];
  user: User;
};

export type Mutation = {
  __typename?: "Mutation";
  signup: AuthPayload;
  createMessage: Scalars["Boolean"];
};

export type MutationSignupArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  name: Scalars["String"];
};

export type MutationCreateMessageArgs = {
  text: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  user: User;
  users: Array<User>;
};

export type QueryUserArgs = {
  id: Scalars["ID"];
};

export type Subscription = {
  __typename?: "Subscription";
  userAdded?: Maybe<User>;
};

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  email: Scalars["String"];
  name: Scalars["String"];
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

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  User: ResolverTypeWrapper<User>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Mutation: ResolverTypeWrapper<{}>;
  AuthPayload: ResolverTypeWrapper<AuthPayload>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Subscription: ResolverTypeWrapper<{}>;
  Message: ResolverTypeWrapper<Message>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  User: User;
  String: Scalars["String"];
  Mutation: {};
  AuthPayload: AuthPayload;
  Boolean: Scalars["Boolean"];
  Subscription: {};
  Message: Message;
  Int: Scalars["Int"];
};

export type AuthPayloadResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["AuthPayload"]
> = {
  token?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export type MessageResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Message"]
> = {
  id?: Resolver<ResolversTypes["Int"], ParentType, ContextType>;
  text?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["User"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Mutation"]
> = {
  signup?: Resolver<
    ResolversTypes["AuthPayload"],
    ParentType,
    ContextType,
    MutationSignupArgs
  >;
  createMessage?: Resolver<
    ResolversTypes["Boolean"],
    ParentType,
    ContextType,
    MutationCreateMessageArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Query"]
> = {
  user?: Resolver<
    ResolversTypes["User"],
    ParentType,
    ContextType,
    QueryUserArgs
  >;
  users?: Resolver<Array<ResolversTypes["User"]>, ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["Subscription"]
> = {
  userAdded?: SubscriptionResolver<
    Maybe<ResolversTypes["User"]>,
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthPayload?: AuthPayloadResolvers<ContextType>;
  Message?: MessageResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
