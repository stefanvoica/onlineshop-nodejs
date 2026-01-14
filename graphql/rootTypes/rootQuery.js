const graphql = require("graphql");
const productsQuery = require("../queries/productQuery");
const cartQuery = require("../queries/cartQuery");
const myOrdersQuery = require("../queries/orderQuery");

const RootQuery = new graphql.GraphQLObjectType({
  name: "Query",
  fields: {
    products: productsQuery,
    cart: cartQuery,
    myOrders: myOrdersQuery,
  },
});

module.exports = RootQuery;