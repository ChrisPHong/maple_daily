'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommentLike.belongsTo(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
      CommentLike.belongsTo(models.Comments, {foreignKey: 'commentId', onDelete: 'CASCADE', hooks: true})
    }
  };
  CommentLike.init({
    userId: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentLike',
  });
  return CommentLike;
};
