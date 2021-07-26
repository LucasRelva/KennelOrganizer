'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('dogs', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      image: {
        type: Sequelize.STRING,
        allowNull: true,
      },

      weight: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },

      age: {
        type: Sequelize.INTEGER,
        allowNull: false
      },

      behavior: {
        type: Sequelize.STRING,
        allowNull: false
      },

      inKennel: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      
      entreDate:{
        type: Sequelize.STRING,
        allowNull: false,
      },

      kennelId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {model: 'kennels', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
        defaultValue: null
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('dogs');
  }
};
