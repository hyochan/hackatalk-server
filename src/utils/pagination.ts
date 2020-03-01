// import { ResultConnection, Schemas } from '../generated/graphql';
import {
  Message,
  MessagesConnection,
  Scalars,
  User,
  UsersConnection,
} from '../generated/graphql';

interface ResultConnection<Schema, TypeName> {
  __typename?: TypeName;
  cursor?: Scalars['String'];
  hasMore: Scalars['Boolean'];
  results: Array<Schema>;
};
function paginateResults<
  Schema extends User | Message,
  Connection extends UsersConnection | MessagesConnection,
  TypeName
>({
  after,
  pageSize = 20,
  lastRow,
  results,
}: {
  after?: string;
  pageSize?: number;
  lastRow: Schema;
  results: Array<Schema>;
}): ResultConnection<Schema, TypeName> {
  if (results.length === 0) {
    return {
      cursor: null,
      hasMore: false,
      results,
    };
  }
  const resultLastRowCreatedAt = results[results.length - 1].createdAt;
  const resultLastRowCreatedAtDt = new Date(resultLastRowCreatedAt).getTime();
  const paramLastRowCreatedAt = lastRow.createdAt;
  const paramLastRowCreatedAtDt = new Date(paramLastRowCreatedAt).getTime();
  const isLast = resultLastRowCreatedAtDt === paramLastRowCreatedAtDt;
  const cursor = isLast ? null : resultLastRowCreatedAt;
  const hasMore = !isLast;

  return {
    cursor,
    hasMore,
    results,
  };
}

export default paginateResults;
