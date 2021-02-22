import React, { Suspense } from 'react';
import { createBrowserHistory } from 'history';
import RootWrapper from './wrappers/RootWrapper';
import { Router } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import configs from 'config';

export const history = createBrowserHistory();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 24 * 3600 * 1000, // cache for 1 day
      retry: false,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router history={history}>
        <Suspense fallback={null}>
          <RootWrapper />
        </Suspense>
      </Router>
      {configs.APP_ENV !== 'prod' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

export default App;
