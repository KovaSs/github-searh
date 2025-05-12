import { apolloClient } from '@/app/providers/ApolloProvider';

import { GET_USER } from '../model/schemas';

export const fetchUser = () => {
  return apolloClient.query({ query: GET_USER });
}
