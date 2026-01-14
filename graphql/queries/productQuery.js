const graphql = require("graphql");
const { GraphQLList, GraphQLInt } = graphql;
const ProductType = require("../types/ProductType");
const { Product } = require("../../models");

const productsQuery = {
  type: new GraphQLList(ProductType),
  args: {
    limit: { type: GraphQLInt },
    offset: { type: GraphQLInt },
  },
  resolve(_, args) {
    const { limit = 10, offset = 0 } = args;
    return Product.findAll({ limit, offset });
  },
};

module.exports = productsQuery;