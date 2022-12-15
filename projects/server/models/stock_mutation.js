"use strict";
const { Model } = require("sequelize");
const journal = require("./journal");
const product = require("./product");
const warehouse = require("./warehouse");
module.exports = (sequelize, DataTypes) => {
  class Stock_Mutation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock_Mutation.belongsTo(warehouse, {
        as: "IdWarehouseFrom",
        foreignKey: "IdWarehouse",
      });
      Stock_Mutation.belongsTo(warehouse, {
        as: "IdWarehouseTo",
        foreignKey: "IdWarehouse",
      });
      Stock_Mutation.hasOne(journal, {
        foreignKey: "IdStock_Mutation",
      });
      Stock_Mutation.belongsTo(product);
    }
  }
  Stock_Mutation.init(
    {
      invoice: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      approval: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Stock_Mutation",
    }
  );
  return Stock_Mutation;
};
