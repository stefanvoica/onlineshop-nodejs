const { setupTestDB, db } = require("../helper");
const { placeOrder } = require("../../graphql/mutations/orderMutation");

setupTestDB();

describe("Mutation: placeOrder", () => {
  let user;
  let product;

  beforeEach(async () => {
    user = await db.User.create({
      email: "user@test.com",
      passwordHash: "hash",
      role: "USER",
    });

    product = await db.Product.create({
      name: "Mouse",
      price: 100,
      stock: 10,
    });

    const cart = await db.Cart.create({ userId: user.id });

    await db.CartItem.create({
      cartId: cart.id,
      productId: product.id,
      quantity: 2,
    });
  });

  it("happy path - place order", async () => {
    const context = { user: { id: user.id } };

    const result = await placeOrder.resolve(null, {}, context);

    expect(result.status).toBe("PLACED");
    expect(result.total).toBe(200);
  });

  describe("Sad path", () => {
    it("should throw error if user is not authenticated", async () => {
      await expect(
        placeOrder.resolve(null, {}, {})
      ).rejects.toThrow("Unauthorized");
    });
  });

});