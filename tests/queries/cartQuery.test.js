const { setupTestDB, db } = require("../helper");
const cartQuery = require("../../graphql/queries/cartQuery");

setupTestDB();

describe("Query: cart", () => {
  describe("Happy path", () => {
    it("should return empty cart for authenticated user", async () => {
      const user = await db.User.create({
        email: "test@test.com",
        passwordHash: "hash",
        role: "USER",
      });

      const context = { user: { id: user.id } };

      const result = await cartQuery.resolve(null, {}, context);

      expect(result.totalValue).toBe(0);
      expect(result.items).toEqual([]);
    });
  });

  describe("Sad path", () => {
    it("should throw error if user is not authenticated", async () => {
      expect(() => {
        cartQuery.resolve(null, {}, {});
      }).toThrow("Unauthorized");
    });
  });
});