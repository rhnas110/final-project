"use strict";
const { Model } = require("sequelize");
const user = require("./user");
module.exports = (sequelize, DataTypes) => {
  class User_Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Address.hasMany(user, {
        foreignKey: "IdAddress",
      });
    }
  }
  User_Address.init(
    {
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      city_type: DataTypes.STRING,
      postal_code: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User_Address",
    }
  );
  return User_Address;
};
