'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class warehouse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      warehouse.belongsTo(models.user);
      warehouse.hasMany(models.stock_mutation);
      warehouse.belongsToMany(models.product, { through: "Product_Warehouse" });
    }
  }
  warehouse.init({
    warehouse_name: DataTypes.STRING,
    province: DataTypes.STRING,
    city: DataTypes.STRING,
    postal_code: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'warehouse',
  });
  return warehouse;
};