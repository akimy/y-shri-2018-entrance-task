import GraphQLDate from 'graphql-date';
import query from './query';
import mutation from './mutation';


const resolvers = () => ({
  Query: query,

  Mutation: mutation,

  Event: {
    users(event) {
      return event.getUsers();
    },
    room(event) {
      return event.getRoom();
    },
  },

  User: {
    events(user) {
      return user.getEvents();
    },
  },

  Date: GraphQLDate,
});

export default resolvers;
