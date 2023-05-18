'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class Forums extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Forums.belongsTo(models.User, {foreignKey: 'userId', hooks: true})
      Forums.hasMany(models.Comments, {foreignKey: 'forumId', onDelete: 'CASCADE', hooks: true})
      Forums.hasMany(models.ForumLike, {foreignKey: 'forumId', onDelete: 'CASCADE', hooks: true})
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
