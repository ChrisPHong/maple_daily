'use strict';
const { Model, Validator } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, username, email } = this; // context will be the User instance
      return { id, username, email };
    }
    validatePassword(password) {
      return bcrypt.compareSync(password, this.hashedPassword.toString());
    }
    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }
    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential,
          },
        },
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }
    static async signup({ username, email, password }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        username,
        email,
        hashedPassword,
      });
      return await User.scope('currentUser').findByPk(user.id);
    };
    static associate(models) {
      // define association here
      User.hasMany(models.List, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Task, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Forums, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      User.hasMany(models.Comments, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })
      // User.hasMany(models.Boss, { foreignKey: 'userId', onDelete: 'CASCADE', hooks: true })

      // Figure out how to create a one to many relationship for friends
      // User.hasMany(models.User, {foreignKey: 'userId', onDelete: 'CASCADE', hooks: true})
    }
  };
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [4, 30],
          isNotEmail(value) {
            if (Validator.isEmail(value)) {
              throw new Error("Cannot be an email.");
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 256],
        },
      },
      hashedPassword: {
        type: DataTypes.STRING.BINARY,
        allowNull: false,
        validate: {
          len: [60, 60],
        },
      },
      resetPasswordToken: DataTypes.STRING,
      resetPasswordTokenExpires: DataTypes.DATE
    },
    {
      sequelize,
      modelName: "User",
      defaultScope: {
        attributes: {
          exclude: ["hashedPassword", "email", "createdAt", "updatedAt"],
        },
      },
      scopes: {
        currentUser: {
          attributes: { exclude: ["hashedPassword", "resetPasswordTokenExpires", "resetPasswordToken"] },
        },
        loginUser: {
          attributes: {},
        },
      },
    }
  );
  return User;
};
