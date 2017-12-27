import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';
import typeDefs from './typeDefs';
import resolvers from './resolvers';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers(),
});

const router = graphqlHTTP({
  schema,
  graphiql: true,
});

export default router;
