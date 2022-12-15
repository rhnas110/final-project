'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class stock_mutation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      stock_mutation.belongsTo(models.warehouse, {
        as: "IdWarehouseFrom",
        foreignKey: "IdWarehouse",
      });
      stock_mutation.belongsTo(models.warehouse, {
        as: "IdWarehouseTo",
        foreignKey: "IdWarehouse",
      });
      stock_mutation.hasOne(models.journal);
      stock_mutation.belongsTo(models.product);
    }
  }
  stock_mutation.init({
    quantity: DataTypes.INTEGER,
    approval: DataTypes.INTEGER,
    invoice: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'stock_mutation',
  });
  return stock_mutation;
};