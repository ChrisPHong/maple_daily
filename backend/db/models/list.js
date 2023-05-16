"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class List extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     List.belongsTo(models.User, {foreignKey:'userId'})
     List.hasMany(models.Task, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
    }
  }
  List.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      character: DataTypes.STRING,
      apiContent: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
