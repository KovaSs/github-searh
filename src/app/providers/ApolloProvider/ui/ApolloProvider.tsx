import React from 'react';
import { ApolloClient, createHttpLink, InMemoryCache, ApolloProvider as ApolloClientProvider } from '@apollo/client';

// Настройка Apollo Client
const client = new ApolloClient({
  link: createHttpLink({
    uri: 'https://api.github.com/graphql',
    credentials: 'same-origin',
    headers: {
      Authorization: `bearer ${__GITHUB_ACCESS_TOKEN__}`, // Используйте токен доступа GitHub
    },
  }), // URL GraphQL API GitHub
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  )
}
