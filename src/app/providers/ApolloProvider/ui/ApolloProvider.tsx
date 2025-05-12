import React from 'react';
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  ApolloProvider as ApolloClientProvider,
  ApolloLink,
  concat,
} from '@apollo/client';

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  credentials: 'same-origin',
});

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem('token');

  operation.setContext({
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return forward(operation);
});

// Настройка Apollo Client
export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

export const ApolloProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ApolloClientProvider client={client}>
      {children}
    </ApolloClientProvider>
  )
}
