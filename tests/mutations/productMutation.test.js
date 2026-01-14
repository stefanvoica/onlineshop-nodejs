const { setupTestDB, db } = require("../helper");
const { createProduct } = require("../../graphql/mutations/productMutation");

setupTestDB();

describe("Mutation: createProduct", () => {
  let admin;
  let user;

  beforeEach(async () => {
    admin = await db.User.create({
      email: "admin@test.com",
      passwordHash: "hash",
      role: "ADMIN",
    });

    user = await db.User.create({
      email: "user@test.com",
      passwordHash: "hash",
      role: "USER",
    });
  });

  it("happy path - admin can create product", async () => {
    const context = { user: { id: admin.id, role: "ADMIN" } };

    const input = {
      name: "Mouse",
      price: 100,
      stock: 10,
    };

    const result = await createProduct.resolve(null, { input }, context);

    expect(result.name).toBe("Mouse");
  });

  it("sad path - user cannot create product", async () => {
    const context = { user: { id: user.id, role: "USER" } };

    const input = {
      name: "Mouse",
      price: 100,
      stock: 10,
    };

    await expect(
      createProduct.resolve(null, { input }, context)
    ).rejects.toThrow("Forbidden");
  });
});