'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      journal.hasOne(models.transaction);
      journal.belongsTo(models.journal_type)
      journal.belongsTo(models.stock_mutation)
      journal.belongsTo(models.product)
    }
  }
  journal.init({
    stock_before: DataTypes.INTEGER,
    stock_after: DataTypes.STRING,
    desc: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'journal',
  });
  return journal;
};