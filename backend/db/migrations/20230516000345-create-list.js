"use strict";
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Lists", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      character: {
        type: Sequelize.STRING,
      },
      apiContent: {
        type: Sequelize.STRING(1000),
      },
      characterClass: {
        type: Sequelize.STRING(300),
      },
      server: {
        type: Sequelize.STRING(300),
      },
      level: {
        type: Sequelize.STRING(300),
      },
      completed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      orderBy: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Lists");
  },
};
