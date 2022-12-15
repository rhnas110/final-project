'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.hasMany(models.product_image);
      product.hasMany(models.cart);
      product.hasMany(models.journal);
      product.hasOne(models.stock_mutation);
      product.belongsToMany(models.warehouse, { through: "Product_Warehouse" });
    }
  }
  product.init({
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    price: DataTypes.INTEGER,
    weight: DataTypes.INTEGER,
    category: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'product',
  });
  return product;
};