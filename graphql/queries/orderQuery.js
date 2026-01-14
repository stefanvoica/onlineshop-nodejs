const graphql = require("graphql");
const { GraphQLList } = graphql;
const OrderType = require("../types/OrderType");
const { Order, OrderDetails } = require("../../models");

const myOrdersQuery = {
  type: new GraphQLList(OrderType),
  resolve(_, __, context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    return Order.findAll({
      where: { userId: context.user.id },
      include: OrderDetails,
      order: [["createdAt", "DESC"]],
    });
  },
};

module.exports = myOrdersQuery;