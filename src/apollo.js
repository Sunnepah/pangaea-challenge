import { ApolloClient, InMemoryCache, makeVar } from '@apollo/client';

export const cartItemsVar = makeVar([]);

const client = new ApolloClient({
  uri: 'https://pangaea-interviews.now.sh/api/graphql',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          cartItems: {
            read() {
              return cartItemsVar();
            },
          },
        },
      },
    },
  }),
});

export default client;
