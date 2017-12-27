import typeDefs from './typeDefs';
import resolvers from './resolvers';
import graphqlHTTP from 'express-graphql';
import { makeExecutableSchema } from 'graphql-tools';

const schema = makeExecutableSchema({
  typeDefs,
  resolvers: resolvers(),
});

const router = graphqlHTTP({
  schema: schema,
  graphiql: true,
});

export default router;
