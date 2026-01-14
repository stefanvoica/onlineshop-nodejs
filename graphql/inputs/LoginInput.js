const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLString } = graphql;

const LoginInput = new GraphQLInputObjectType({
  name: "LoginInput",
  fields: {
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  },
});

module.exports = LoginInput;