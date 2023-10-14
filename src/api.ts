import { GraphQLClient } from 'graphql-request';
import { QueryClient } from 'react-query';

import { getSdk } from '../src/generated/graphql';

const gqlClient = new GraphQLClient(
  'https://christmas-list-x5fy.vercel.app/api/graphql'
);
export const { memberByName, getMember } = getSdk(gqlClient);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    },
  },
});
