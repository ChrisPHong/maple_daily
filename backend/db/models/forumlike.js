'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ForumLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ForumLike.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      ForumLike.belongsTo(models.Forums, {foreignKey: 'forumId', onDelete: 'CASCADE', hooks: true})
    }
  };
  ForumLike.init({
    userId: DataTypes.INTEGER,
    forumId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ForumLike',
  });
  return ForumLike;
};
