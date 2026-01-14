const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLString } = graphql;

const RegisterInput = new GraphQLInputObjectType({
  name: "RegisterInput",
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

module.exports = RegisterInput;