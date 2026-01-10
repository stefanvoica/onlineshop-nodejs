const User = require("./User");
const Cart = require("./Cart");
const Product = require("./Product");
const CartItem = require("./CartItem");
const Order = require("./Order");
const OrderDetails = require("./OrderDetails");

User.hasOne(Cart, {
  foreignKey: {
    name: "userId",
    allowNull: false,
    unique: true,
  },
});
Cart.belongsTo(User, { foreignKey: "userId" });

Cart.belongsToMany(Product, {
  through: CartItem,
  foreignKey: "cartId",
});
Product.belongsToMany(Cart, {
  through: CartItem,
  foreignKey: "productId",
});

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.hasMany(OrderDetails, { foreignKey: "orderId" });
OrderDetails.belongsTo(Order, { foreignKey: "orderId" });

module.exports = {
  User,
  Cart,
  Product,
  CartItem,
  Order,
  OrderDetails,
};
