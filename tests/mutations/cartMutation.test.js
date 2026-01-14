const { setupTestDB, db } = require("../helper");
const { addToCart, updateCartItem } = require("../../graphql/mutations/cartMutation");

setupTestDB();

describe("Mutation: cart", () => {
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
  });

  it("happy path - addToCart", async () => {
    const context = { user: { id: user.id } };

    const input = {
      productId: product.id,
      quantity: 2,
    };

    const result = await addToCart.resolve(null, { input }, context);

    expect(result.items.length).toBe(1);
    expect(result.totalValue).toBe(200);
  });

  it("sad path - unauthenticated user", async () => {
    const input = {
      productId: product.id,
      quantity: 1,
    };

    await expect(
      addToCart.resolve(null, { input }, {})
    ).rejects.toThrow("Unauthorized");
  });


  it("happy path - updateCartItem", async () => {
    const context = { user: { id: user.id } };

    await addToCart.resolve(
      null,
      { input: { productId: product.id, quantity: 1 } },
      context
    );

    const result = await updateCartItem.resolve(
      null,
      { input: { productId: product.id, quantity: 3 } },
      context
    );

    expect(result.totalValue).toBe(300);
  });
});