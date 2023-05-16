'use strict';

module.exports = {

    up: async (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Bosses', [
        {
          bossNames: 'Zakum',
          price: '1,837,500',
          date: 'Wednesday',
          resetTime:'1700',
          createdAt: new Date(),
          updatedAt:new Date(),
        },
      ], {});
    },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
    */
    await queryInterface.bulkDelete('Bosses', null, {});
  }
};
