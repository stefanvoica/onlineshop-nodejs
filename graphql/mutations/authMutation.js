const graphql = require("graphql");
const { GraphQLNonNull, GraphQLString } = graphql;
const UserType = require("../types/UserType");
const RegisterInput = require("../inputs/RegisterInput");
const LoginInput = require("../inputs/LoginInput");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../models");

const JWT_SECRET = "super-secret-key";

const register = {
  type: UserType,
  args: {
    input: { type: new GraphQLNonNull(RegisterInput) },
  },
  async resolve(_, { input }) {
    const { email, password } = input;
    const passwordHash = await bcrypt.hash(password, 10);
    return User.create({ email, passwordHash, role: "USER" });
  },
};

const login = {
  type: GraphQLString,
  args: {
    input: { type: new GraphQLNonNull(LoginInput) },
  },
  async resolve(_, { input }) {
    const { email, password } = input;

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Invalid credentials");

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) throw new Error("Invalid credentials");

    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
  },
};

module.exports = { register, login };