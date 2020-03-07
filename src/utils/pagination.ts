import {
  Message,
  MessagesConnection,
  PageInfo,
  Scalars,
  User,
  UsersConnection,
} from '../generated/graphql';

interface ResultConnection<Schema, TypeName> {
  __typename?: TypeName;
  cursor?: Scalars['String'];
  hasMore: Scalars['Boolean'];
  results: Array<Schema>;
}
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
function getPageInfo<Schema extends User | Message>({
  first,
  last,
  lastRow,
  results,
}: {
  first: number;
  last: number;
  lastRow: Schema;
  results: Array<Schema>;
}): PageInfo {
  const pageInfo = {
    startCursor: null,
    hasPreviousPage: false,
    endCursor: null,
    hasNextPage: false,
  };
  if (results.length === 0) {
    if (first) {
      pageInfo.hasNextPage = true;
    }
    if (last) {
      pageInfo.hasPreviousPage = true;
    }
    return pageInfo;
  }
  const startCursor = new Date(results[0].createdAt).getTime();
  const endCursor = new Date(results[results.length - 1].createdAt).getTime();
  const paramLastRowCreatedAtDt = new Date(lastRow.createdAt).getTime();
  pageInfo.endCursor = endCursor;
  pageInfo.startCursor = startCursor;
  if (first) {
    pageInfo.hasNextPage = endCursor !== paramLastRowCreatedAtDt;
    pageInfo.hasPreviousPage = endCursor !== paramLastRowCreatedAtDt;
  }
  if (last) {
    pageInfo.hasNextPage = endCursor !== paramLastRowCreatedAtDt;
    pageInfo.hasPreviousPage = endCursor !== paramLastRowCreatedAtDt;
  }

  return pageInfo;
}

export { paginateResults, getPageInfo };
