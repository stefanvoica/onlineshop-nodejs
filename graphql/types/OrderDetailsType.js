const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLFloat } = graphql;

const OrderDetailsType = new GraphQLObjectType({
  name: "OrderDetails",
  fields: () => ({
    productName: { type: GraphQLString },
    productPrice: { type: GraphQLFloat },
    quantity: { type: GraphQLInt },
  }),
});

module.exports = OrderDetailsType;