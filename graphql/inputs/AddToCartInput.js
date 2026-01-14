const graphql = require("graphql");
const { GraphQLInputObjectType, GraphQLInt } = graphql;

const AddToCartInput = new GraphQLInputObjectType({
  name: "AddToCartInput",
  fields: {
    productId: { type: GraphQLInt },
    quantity: { type: GraphQLInt },
  },
});

module.exports = AddToCartInput;