import { apolloClient } from '@/app/providers/ApolloProvider';

import { GET_REPOSITORY } from '../model/schemas';

export const fetchRepository = ({ name, owner }: Record<'owner' | 'name', string>) => {
  return apolloClient.query({
    variables: { name,  owner },
    query: GET_REPOSITORY,
  });
}
