const graphql = require("graphql");
const { register, login } = require("../mutations/authMutation");
const { addToCart, updateCartItem } = require("../mutations/cartMutation");
const { placeOrder } = require("../mutations/orderMutation");
const { createProduct } = require("../mutations/productMutation");

const RootMutation = new graphql.GraphQLObjectType({
  name: "Mutation",
  fields: {
    register,
    login,
    addToCart,
    updateCartItem,
    placeOrder,
    createProduct,
  },
});

module.exports = RootMutation;