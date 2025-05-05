import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@/app/providers/ApolloProvider';
import { AppRouter } from './providers/router';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ApolloProvider>
        <AppRouter />
      </ApolloProvider>
    </BrowserRouter>
  )
}

export default App
