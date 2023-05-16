'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Forums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Forums.init({
    userId: DataTypes.INTEGER,
    question: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Forums',
  });
  return Forums;
};