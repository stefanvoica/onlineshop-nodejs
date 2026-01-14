const graphql = require("graphql");
const { GraphQLNonNull } = graphql;
const CartType = require("../types/CartType");
const { Cart, Product } = require("../../models");

const cartQuery = {
  type: new GraphQLNonNull(CartType),
  resolve(_, __, context) {
    if (!context.user) {
      throw new Error("Unauthorized");
    }

    const userId = context.user.id;

    return Cart.findOne({
      where: { userId },
      include: {
        model: Product,
        through: { attributes: ["quantity"] },
      },
    }).then((cart) => {
      if (!cart) {
        return { items: [], totalValue: 0 };
      }

      const items = cart.Products.map((p) => ({
        quantity: p.CartItem.quantity,
        product: p,
      }));

      const totalValue = items.reduce(
        (sum, item) => sum + item.quantity * item.product.price,
        0
      );

      return { items, totalValue };
    });
  },
};

module.exports = cartQuery;