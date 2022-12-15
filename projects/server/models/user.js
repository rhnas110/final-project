"use strict";
const { Model } = require("sequelize");
const cart = require("./cart");
const user_address = require("./user_address");
const warehouse = require("./warehouse");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.belongsTo(user_address);
      User.hasOne(cart, {
        foreignKey: "IdUser",
      });
      User.hasOne(warehouse, {
        foreignKey: "IdUser",
      });
    }
  }
  User.init(
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
      modelName: "User",
    }
  );
  return User;
};
