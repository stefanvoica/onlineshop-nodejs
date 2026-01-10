const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");

require("./models");

async function start() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  try {
    await sequelize.authenticate();
    console.log("Database connected");
    await sequelize.sync();
    console.log("Models working");
  } catch (error) {
    console.error("Database error:", error);
  }

  const PORT = 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

start();