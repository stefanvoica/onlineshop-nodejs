const graphql = require("graphql");
const { GraphQLNonNull } = graphql;
const ProductType = require("../types/ProductType");
const CreateProductInput = require("../inputs/CreateProductInput");
const { Product } = require("../../models");

const createProduct = {
  type: ProductType,
  args: {
    input: { type: new GraphQLNonNull(CreateProductInput) },
  },
  resolve: async (_, { input }, context) => {
  if (!context.user || context.user.role !== "ADMIN") {
    throw new Error("Forbidden");
  }
  return Product.create(input);
  },
};

module.exports = { createProduct };