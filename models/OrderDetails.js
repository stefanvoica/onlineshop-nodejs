const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const OrderDetails = sequelize.define(
  "OrderDetails",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },

    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    productPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: "OrderDetails",
    tableName: "order_details",
    timestamps: true,
  }
);

module.exports = OrderDetails;
