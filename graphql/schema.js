const graphql = require("graphql");
const RootQuery = require("./rootTypes/rootQuery");
const RootMutation = require("./rootTypes/rootMutation");

const schema = new graphql.GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;