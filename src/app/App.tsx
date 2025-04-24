import { FC } from 'react';

import { ApolloProvider } from '@/app/providers/ApolloProvider';
import { Repositories } from '@/pages/Repositories';

const App: FC = () => {
  return (
    <ApolloProvider>
      <Repositories />
    </ApolloProvider>
  )
}

export default App
