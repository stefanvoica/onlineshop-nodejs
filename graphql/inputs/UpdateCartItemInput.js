const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLInt } = graphql;

const UpdateCartItemInput = new GraphQLInputObjectType({
  name: "UpdateCartItemInput",
  fields: {
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

module.exports = UpdateCartItemInput;