'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Users', 'resetPasswordToken', {
      type: Sequelize.STRING(1000),
      allowNull: true,
    });
    await queryInterface.addColumn('Users', 'resetPasswordTokenExpires', {
      type: Sequelize.DATE(),
      allowNull: true,

    });

  },

  down: async (queryInterface, Sequelize) => {

    await queryInterface.removeColumn('Users', 'resetPasswordToken', {
      type: Sequelize.STRING(1000)
    });
    await queryInterface.removeColumn('Users', 'resetPasswordTokenExpires', {
      type: Sequelize.DATE()
    });
  }
};
