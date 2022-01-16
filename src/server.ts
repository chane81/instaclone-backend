import { ApolloServer, gql } from 'apollo-server';
import env from '~/config/env';

const typeDefs = gql`
  type Query {
    hello: String!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hi~~',
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(env.SERVER_PORT)
  .then(() => console.log(`Server is running on http://localhost:${env.SERVER_PORT}/`));
