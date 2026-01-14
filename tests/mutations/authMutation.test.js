const { setupTestDB, db } = require("../helper");
const { register, login } = require("../../graphql/mutations/authMutation");
const bcrypt = require("bcrypt");

setupTestDB();

describe("Mutation: auth", () => {
  describe("register", () => {
    it("happy path - should create user", async () => {
      const input = {
        email: "user@test.com",
        password: "1234",
      };

      const result = await register.resolve(null, { input });

      expect(result.email).toBe("user@test.com");
      expect(result.role).toBe("USER");
    });
  });

  describe("login", () => {
    it("happy path - should return token", async () => {
      const hash = await bcrypt.hash("1234", 10);

        await db.User.create({
            email: "user@test.com",
            passwordHash: hash,
            role: "USER",
        });

      const input = {
        email: "user@test.com",
        password: "1234",
      };

      await expect(
        login.resolve(null, { input })
      ).resolves.toBeDefined();
    });

    it("sad path - invalid credentials", async () => {
      const input = {
        email: "nouser@test.com",
        password: "wrong",
      };

      await expect(
        login.resolve(null, { input })
      ).rejects.toThrow("Invalid credentials");
    });
  });
});