const { setupTestDB, db } = require("../helper");
const productsQuery = require("../../graphql/queries/productQuery");

setupTestDB();

describe("Query: products", () => {
  describe("Happy path", () => {
    it("should return list of products", async () => {
      await db.Product.create({
        name: "Mouse",
        price: 100,
        stock: 10,
      });

      const result = await productsQuery.resolve(null, {}, {});

      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Mouse");
    });
  });

  describe("Sad path", () => {
    it("should return empty array when no products exist", async () => {
      const result = await productsQuery.resolve(null, {}, {});
      expect(result).toEqual([]);
    });
  });
});