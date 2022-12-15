'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      transaction.belongsTo(models.order_status);
      transaction.belongsTo(models.journal);
      transaction.belongsTo(models.cart);
      transaction.belongsToMany(models.product_warehouse, {
        through: "Transaction_Product_Warehouse",
      });
    }
  }
  transaction.init({
    invoice: DataTypes.STRING,
    delivery_fee: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'transaction',
  });
  return transaction;
};