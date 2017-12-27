import GraphQLDate from 'graphql-date';
import query from './query';
import mutation from './mutation';


const resolvers = () => ({
  Query: query,

  Mutation: mutation,

  Event: {
    users(event) {
      event.getUsers();
    },
    room(event) {
      event.getRoom();
    },
  },

  Date: GraphQLDate,
});

export default resolvers;
