const { setupTestDB, db } = require("../helper");
const myOrdersQuery = require("../../graphql/queries/orderQuery");

setupTestDB();

describe("Query: myOrders", () => {
  describe("Happy path", () => {
    it("should return orders for authenticated user", async () => {
      const user = await db.User.create({
        email: "test@test.com",
        passwordHash: "hash",
        role: "USER",
      });

      await db.Order.create({
        userId: user.id,
        total: 100,
        status: "PLACED",
      });

      const context = { user: { id: user.id } };

      const result = await myOrdersQuery.resolve(null, {}, context);

      expect(result.length).toBe(1);
      expect(result[0].total).toBe(100);
    });
  });

  describe("Sad path", () => {
    it("should throw error if user is not authenticated", () => {
      expect(() => {
        myOrdersQuery.resolve(null, {}, {});
      }).toThrow("Unauthorized");
    });
  });
});