process.env.NODE_ENV = "test";

const sequelize = require("../config/database");
const db = require("../models");

const setupTestDB = () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  afterEach(async () => {
    await sequelize.transaction(async (t) => {
      await db.CartItem.destroy({ where: {}, transaction: t });
      await db.Cart.destroy({ where: {}, transaction: t });
      await db.OrderDetails.destroy({ where: {}, transaction: t });
      await db.Order.destroy({ where: {}, transaction: t });
      await db.Product.destroy({ where: {}, transaction: t });
      await db.User.destroy({ where: {}, transaction: t });
    });
  });

  afterAll(async () => {
    await sequelize.close();
  });
};

module.exports = { setupTestDB, db };