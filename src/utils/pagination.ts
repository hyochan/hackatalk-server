import { User, UsersConnection } from '../generated/graphql';

const paginateResults = ({
  pageSize = 20,
  results,
}: {
  pageSize: number;
  results: User[];
}): UsersConnection => {
  console.log({ results });
  if (results.length === 0) {
    // userConnection = {
    return {
      cursor: null,
      hasMore: false,
      users: results,
    };
  };
  const cursor = results[results.length - 1].createdAt;
  return {
    cursor,
    hasMore: true,
    users: results,
  };
};
// module.exports.paginateResults = ({
//   after: cursor,
//   pageSize = 20,
//   results,
//   // can pass in a function to calculate an item's cursor
//   getCursor = (): string => null,
// }): User[] => {
//   if (pageSize < 1) return [];

//   if (!cursor) return results.slice(0, pageSize);
//   const cursorIndex = results.findIndex((item) => {
//     // if an item has a `cursor` on it, use that, otherwise try to generate one
//     const itemCursor = item.cursor ? item.cursor : getCursor(item);

//     // if there's still not a cursor, return false by default
//     return itemCursor ? cursor === itemCursor : false;
//   });

//   return cursorIndex >= 0
//     ? cursorIndex === results.length - 1 // don't let us overflow
//       ? []
//       : results.slice(
//         cursorIndex + 1,
//         Math.min(results.length, cursorIndex + 1 + pageSize),
//       )
//     : results.slice(0, pageSize);
// };

export default paginateResults;
