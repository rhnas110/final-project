"use strict";
const { Model } = require("sequelize");
const transactions = require("./transactions");
module.exports = (sequelize, DataTypes) => {
  class Product_Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product_Warehouse.belongsToMany(transactions, {
        through: "Transaction_Product_Warehouse",
      });
    }
  }
  Product_Warehouse.init(
    {
      Stocks: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Product_Warehouse",
    }
  );
  return Product_Warehouse;
};
