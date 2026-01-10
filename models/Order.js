const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    total: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM("PLACED", "PAID", "CANCELLED"),
      allowNull: false,
      defaultValue: "PLACED",
    },
  },
  {
    modelName: "Order",
    tableName: "orders",
    timestamps: true,
  }
);

module.exports = Order;
