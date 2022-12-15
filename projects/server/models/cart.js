"use strict";
const { Model } = require("sequelize");
const product = require("./product");
const transactions = require("./transactions");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Cart.belongsTo(user);
      Cart.belongsTo(product);
      Cart.hasOne(transactions, {
        foreignKey: "IdCart"
      })
    }
  }
  Cart.init(
    {
      Quantity: DataTypes.INTEGER,
      Price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Cart",
    }
  );
  return Cart;
};
