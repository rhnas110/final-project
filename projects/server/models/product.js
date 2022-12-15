"use strict";
const { Model } = require("sequelize");
const cart = require("./cart");
const journal = require("./journal");
const product_image = require("./product_image");
const stock_mutation = require("./stock_mutation");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(product_image, {
        foreignKey: "IdProduct",
      });
      Product.hasMany(cart, {
        foreignKey: "IdProduct",
      });
      Product.hasMany(journal, {
        foreignKey: "IdProduct",
      });
      Product.hasOne(stock_mutation, {
        foreignKey: "IdProduct",
      });
      Product.belongsToMany(stock_mutation, { through: "Product_Warehouse" });
    }
  }
  Product.init(
    {
      Name: DataTypes.STRING,
      Description: DataTypes.STRING,
      Price: DataTypes.INTEGER,
      Weight: DataTypes.INTEGER,
      Category: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
