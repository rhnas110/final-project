'use strict';
const {
  Model
} = require('sequelize');
// const address_users = require('./address_users');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.belongsTo(models.address_user);
      user.hasOne(models.cart);
      user.hasOne(models.warehouse);
    }
  }
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    gender: DataTypes.STRING,
    is_verified: DataTypes.BOOLEAN,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};