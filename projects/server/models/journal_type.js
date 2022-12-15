"use strict";
const { Model } = require("sequelize");
const journal = require("./journal");
module.exports = (sequelize, DataTypes) => {
  class Journal_Type extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal_Type.hasMany(journal, {
        foreignKey: "IdJournal_Type",
      });
    }
  }
  Journal_Type.init(
    {
      Type: DataTypes.STRING,
      Append: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Journal_Type",
    }
  );
  return Journal_Type;
};
