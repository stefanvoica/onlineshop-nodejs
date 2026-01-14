const express = require("express");
const cors = require("cors");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const sequelize = require("./config/database");
const jwt = require("jsonwebtoken");
const schema = require("./graphql/schema");

const JWT_SECRET = "super-secret-key";

require("./models");

async function start() {
  const app = express();

  const apolloServer = new ApolloServer({
    schema,
  });

  await apolloServer.start();

  app.use(cors());
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(apolloServer, {
      context: async ({ req }) => {
        const authHeader = req.headers.authorization || "";
        let user = null;

        if (authHeader.startsWith("Bearer ")) {
          const token = authHeader.replace("Bearer ", "");
          try {
            user = jwt.verify(token, JWT_SECRET);
          } catch (err) {
            console.log("Invalid token");
          }
        }

        return { user };
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Online Shop API is running");
  });

  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    console.log("Models synced");
  } catch (error) {
    console.error("Database error:", error);
  }

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/graphql`);
  });
}

start();
