const graphql = require("graphql");
const {GraphQLObjectType, GraphQLID, GraphQLString, GraphQLFloat, GraphQLInt} = graphql;

const ProductType = new GraphQLObjectType({ //forma obiectului pe care il returneaza API
  name: "Product",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    price: { type: GraphQLFloat },
    stock: { type: GraphQLInt },
  }),
});

module.exports = ProductType;