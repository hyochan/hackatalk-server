import { User, UsersConnection } from '../generated/graphql';

const paginateResults = ({
  after,
  pageSize = 20,
  lastRow,
  results,
}: {
  after: string;
  pageSize: number;
  lastRow: User;
  results: User[];
}): UsersConnection => {
  if (results.length === 0) {
    return {
      cursor: null,
      hasMore: false,
      users: results,
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
    users: results,
  };
};

export default paginateResults;
