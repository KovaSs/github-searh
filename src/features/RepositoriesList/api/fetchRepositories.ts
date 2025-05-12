import { apolloClient } from '@/app/providers/ApolloProvider';

import { GET_REPOS } from '../model/schemas';

export const fetchRepositories = (queryString: string, page: number) => {
  return apolloClient.query({
    variables: { queryString },
    query: GET_REPOS,
  });
}
