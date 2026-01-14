const graphql = require("graphql");
const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLList } = graphql;
const OrderDetailsType = require("./OrderDetailsType");

const OrderType = new GraphQLObjectType({
  name: "Order",
  fields: () => ({
    id: { type: GraphQLID },
    total: { type: GraphQLFloat },
    status: { type: GraphQLString },
    details: {
      type: new GraphQLList(OrderDetailsType),
      resolve(parent) {
        return parent.OrderDetails;
      },
    },
    createdAt: { type: GraphQLString },
  }),
});

module.exports = OrderType;