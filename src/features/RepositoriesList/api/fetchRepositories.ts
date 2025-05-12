import { apolloClient } from '@/app/providers/ApolloProvider';

import { GET_REPOS } from '../model/schemas';

export const fetchRepositories = (queryString: string, pageCursor: string) => {
  return apolloClient.query({
    variables: { queryString, page: pageCursor },
    query: GET_REPOS,
  });
}
