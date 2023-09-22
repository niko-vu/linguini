const { mergeTypeDefs } = require('@graphql-tools/merge');
const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

module.exports = {
  typeDefs: mergeTypeDefs([typeDefs]), // merge all type definitions
  resolvers, // export resolvers
};
