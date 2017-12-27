import query from './query';
import mutation from './mutation';
import GraphQLDate from 'graphql-date';

const resolvers = () => {
  return {
    Query: query,

    Mutation: mutation,

    Event: {
      users (event) {
        event.getUsers();
      },
      room (event) {
        event.getRoom();
      }
    },

    Date: GraphQLDate
  };
};

export default resolvers;