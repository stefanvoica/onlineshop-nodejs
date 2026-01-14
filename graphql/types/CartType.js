const graphql = require("graphql");
const { GraphQLObjectType, GraphQLList, GraphQLFloat } = graphql;
const CartItemType = require("./CartItemType");

const CartType = new GraphQLObjectType({
  name: "Cart",
  fields: () => ({
    items: { type: new GraphQLList(CartItemType) },
    totalValue: { type: GraphQLFloat },
  }),
});

module.exports = CartType;