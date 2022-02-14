import { ApolloServer, gql } from 'apollo-server';
import env from '~/config/env';

const typeDefs = gql`
  type Movie {
    id: Int
    title: String
    year: Int
  }
  type Query {
    movies: [Movie]
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!): Boolean
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => [],
    movie: () => ({ title: 'hello', year: 2021 }),
  },
  Mutation: {
    createMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server
  .listen(env.SERVER_PORT)
  .then(() => console.log(`Server is running on http://localhost:${env.SERVER_PORT}/`));
