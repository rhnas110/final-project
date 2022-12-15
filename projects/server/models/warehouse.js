"use strict";
const { Model } = require("sequelize");
const product = require("./product");
const stock_mutation = require("./stock_mutation");
module.exports = (sequelize, DataTypes) => {
  class Warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Warehouse.belongsTo(user);
      Warehouse.hasMany(stock_mutation, {
        foreignKey: "IdWarehouse",
      });
      Warehouse.belongsToMany(product, { through: "Product_Warehouse" });
    }
  }
  Warehouse.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      name: DataTypes.STRING,
      picture: DataTypes.STRING,
      gender: DataTypes.STRING,
      isVerified: DataTypes.BOOLEAN,
      role: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Warehouse",
    }
  );
  return Warehouse;
};
