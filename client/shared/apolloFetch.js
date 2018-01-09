import { createApolloFetch } from 'apollo-fetch';

const uri = '/graphql';
const fetch = createApolloFetch({ uri });

export default fetch;
