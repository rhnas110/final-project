'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class journal_type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      journal_type.hasMany(models.journal);
    }
  }
  journal_type.init({
    type: DataTypes.STRING,
    append: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'journal_type',
  });
  return journal_type;
};