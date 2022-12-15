"use strict";
const { Model } = require("sequelize");
const cart = require("./cart");
const journal = require("./journal");
const order_status = require("./order_status");
const product_warehouse = require("./product_warehouse");
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(order_status);
      Transaction.belongsTo(journal);
      Transaction.belongsTo(cart);
      Transaction.belongsToMany(product_warehouse, {
        through: "Transaction_Product_Warehouse",
      });
    }
  }
  Transaction.init(
    {
      invoice: DataTypes.STRING,
      delivery_fee: DataTypes.INTEGER,
      total_price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Transaction",
    }
  );
  return Transaction;
};
