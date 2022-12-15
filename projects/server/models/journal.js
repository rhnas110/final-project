"use strict";
const { Model } = require("sequelize");
const journal_type = require("./journal_type");
const product = require("./product");
const stock_mutation = require("./stock_mutation");
const transactions = require("./transactions");
module.exports = (sequelize, DataTypes) => {
  class Journal extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Journal.hasOne(transactions, {
        foreignKey: "IdJournal",
      });
      Journal.belongsTo(journal_type)
      Journal.belongsTo(stock_mutation)
      Journal.belongsTo(product)
    }
  }
  Journal.init(
    {
      Stock_Before: DataTypes.INTEGER,
      Stock_After: DataTypes.INTEGER,
      Desc: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Journal",
    }
  );
  return Journal;
};
