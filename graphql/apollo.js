import { ApolloClient, InMemoryCache } from '@apollo/client';

// https://better-beans.vercel.app
// http://localhost:3000

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
});

export default apolloClient;
