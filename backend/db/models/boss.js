'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Boss extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Boss.init({
    bossNames: DataTypes.STRING,
    price: DataTypes.STRING,
    date: DataTypes.DATE,
    resetTime: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Boss',
  });
  return Boss;
};