const graphql = require("graphql");
const { GraphQLNonNull } = graphql;
const CartType = require("../types/CartType");
const AddToCartInput = require("../inputs/AddToCartInput");
const UpdateCartItemInput = require("../inputs/UpdateCartItemInput");
const { Cart, CartItem, Product } = require("../../models");

const addToCart = {
  type: CartType,
  args: {
    input: { type: new GraphQLNonNull(AddToCartInput) },
  },
  async resolve(_, { input }, context) {
    if (!context.user) throw new Error("Unauthorized");

    const { productId, quantity } = input;
    const userId = context.user.id;

    const product = await Product.findByPk(productId);
    if (!product) throw new Error("Product not found");

    let cart = await Cart.findOne({ where: { userId } });
    if (!cart) cart = await Cart.create({ userId });

    const item = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (item) {
      item.quantity += quantity;
      await item.save();
    } else {
      await CartItem.create({ cartId: cart.id, productId, quantity });
    }

    const updated = await Cart.findOne({
      where: { userId },
      include: { model: Product, through: { attributes: ["quantity"] } },
    });

    const items = updated.Products.map((p) => ({
      quantity: p.CartItem.quantity,
      product: p,
    }));

    const totalValue = items.reduce(
      (s, i) => s + i.quantity * i.product.price,
      0
    );

    return { items, totalValue };
  },
};

const updateCartItem = {
  type: CartType,
  args: {
    input: { type: new GraphQLNonNull(UpdateCartItemInput) },
  },
  async resolve(_, { input }, context) {
    if (!context.user) throw new Error("Unauthorized");

    const { productId, quantity } = input;
    const userId = context.user.id;

    const cart = await Cart.findOne({ where: { userId } });
    if (!cart) return { items: [], totalValue: 0 };

    const item = await CartItem.findOne({
      where: { cartId: cart.id, productId },
    });

    if (!item) throw new Error("Product not in cart");

    if (quantity === 0) await item.destroy();
    else {
      item.quantity = quantity;
      await item.save();
    }

    const updated = await Cart.findOne({
      where: { userId },
      include: { model: Product, through: { attributes: ["quantity"] } },
    });

    const items = updated
      ? updated.Products.map((p) => ({
          quantity: p.CartItem.quantity,
          product: p,
        }))
      : [];

    const totalValue = items.reduce(
      (s, i) => s + i.quantity * i.product.price,
      0
    );

    return { items, totalValue };
  },
};

module.exports = { addToCart, updateCartItem };