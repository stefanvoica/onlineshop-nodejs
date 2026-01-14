const graphql = require("graphql");
const { GraphQLObjectType, GraphQLInt } = graphql;
const ProductType = require("./ProductType");

const CartItemType = new GraphQLObjectType({
  name: "CartItem",
  fields: () => ({
    quantity: { type: GraphQLInt },
    product: {
      type: ProductType,
      resolve(parent) {
        return parent.product;
      },
    },
  }),
});

module.exports = CartItemType;