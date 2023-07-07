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
      List.belongsTo(models.User, { foreignKey: "userId", hooks: true });
      List.hasMany(models.Task, {
        foreignKey: "listId",
        onDelete: "CASCADE",
        hooks: true,
      });
    }
  }
  List.init(
    {
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      character: DataTypes.STRING,
      apiContent: DataTypes.STRING,
      completed: DataTypes.BOOLEAN,
      characterClass: DataTypes.STRING,
      server: DataTypes.STRING,
      level: DataTypes.STRING,
      orderBy: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "List",
    }
  );
  return List;
};
