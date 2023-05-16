'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      Task.belongsTo(models.List, {foreignKey: 'listId', onDelete: 'CASCADE', hooks: true})
    }
  };
  Task.init({
    userId: DataTypes.INTEGER,
    listId: DataTypes.INTEGER,
    objective: DataTypes.STRING,
    completed: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
