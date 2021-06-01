import * as React from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {NativeRouter} from 'react-router-native';
import {Root} from './src/Root';

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeRouter>
        <Root />
      </NativeRouter>
    </QueryClientProvider>
  );
};

export default App;
