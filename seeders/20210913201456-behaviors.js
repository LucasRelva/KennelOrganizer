'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('behaviors', [
      {
        id: 1,
        name: 'Sociável com animais',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, {
        id: 2,
        name: 'Sociável com criança',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        name: 'Dócil',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 4,
        name: 'Inseguro',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 5,
        name: 'Dominante',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 6,
        name: 'Alta energia',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 7,
        name: 'Baixa energia',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 8,
        name: 'Condicionado',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 9,
        name: 'Não condicionado',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 10,
        name: 'Fugitivo',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        id: 11,
        name: 'Condições especiais',
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('behaviors', null, { truncate: 'true', restartIdentity: 'true' });
  }
};
