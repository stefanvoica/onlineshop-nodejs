const graphql = require("graphql");
const { GraphQLNonNull } = graphql;
const OrderType = require("../types/OrderType");
const { Cart, CartItem, Product, Order, OrderDetails } = require("../../models");

const placeOrder = {
  type: new GraphQLNonNull(OrderType),
  async resolve(_, __, context) {
    if (!context.user) throw new Error("Unauthorized");

    const userId = context.user.id;

    const cart = await Cart.findOne({
      where: { userId },
      include: { model: Product, through: { attributes: ["quantity"] } },
    });

    if (!cart || cart.Products.length === 0)
      throw new Error("Cart is empty");

    const total = cart.Products.reduce(
      (s, p) => s + p.price * p.CartItem.quantity,
      0
    );

    const order = await Order.create({
      userId,
      total,
      status: "PLACED",
    });

    for (const p of cart.Products) {
      await OrderDetails.create({
        orderId: order.id,
        productName: p.name,
        productPrice: p.price,
        quantity: p.CartItem.quantity,
      });
    }

    await CartItem.destroy({ where: { cartId: cart.id } });

    return Order.findByPk(order.id, { include: OrderDetails });
  },
};

module.exports = { placeOrder };