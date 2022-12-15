"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class address_user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      address_user.hasMany(models.user);
    }
  }
  address_user.init(
    {
      province: DataTypes.STRING,
      city: DataTypes.STRING,
      city_type: DataTypes.STRING,
      postal_code: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "address_user",
    }
  );
  return address_user;
};
