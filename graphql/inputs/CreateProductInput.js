const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLString, GraphQLFloat, GraphQLInt } = graphql;

const CreateProductInput = new GraphQLInputObjectType({
  name: "CreateProductInput",
  fields: {
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    stock: { type: GraphQLInt },
  },
});

module.exports = CreateProductInput;