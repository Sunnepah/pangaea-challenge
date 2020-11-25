import React, { useState } from 'react';
import Header from './components/header';
import Products from './components/products';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

function App() {
  /**
  In production, we may consider persisting the apollo cache in the local
  storage to avoid losing data when the app is reloaded.
  Reactive variables in apollo client currently have a limitation as regards persisting its content
  which is being addressed in this open PR https://github.com/apollographql/apollo-client/pull/7148
  **/
  const [displayCart, setDisplayCart] = useState(false);

  return (
    <ApolloProvider client={client}>
      <Header setDisplayCart={setDisplayCart} />
      <Products displayCart={displayCart} setDisplayCart={setDisplayCart} />
    </ApolloProvider>
  );
}

export default App;
