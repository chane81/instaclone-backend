import { PrismaClient } from '@prisma/client';
import { ApolloServer, gql } from 'apollo-server';
import env from '~/config/env';

// prisma client
const client = new PrismaClient({
  datasources: {
    db: {
      url: env.DB_URL,
    },
  },
});

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    deleteMovie(title: String!): Boolean
  }
`;

const resolvers = {
  Query: {
    movies: () => client.movie.findMany(),
    movie: (_, { id }) =>
      client.movie.findUnique({
        where: {
          id,
        },
      }),
  },
  Mutation: {
    createMovie: (_, { title, year, genre }) =>
      client.movie.create({
        data: {
          title,
          year,
          genre,
        },
      }),
    deleteMovie: (_, { title }) => {
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
