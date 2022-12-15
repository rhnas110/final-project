"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Transaction_Product_Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Transaction_Product_Warehouse.init(
    {
      Quantity: DataTypes.INTEGER,
      Price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction_Product_Warehouse",
    }
  );
  return Transaction_Product_Warehouse;
};
