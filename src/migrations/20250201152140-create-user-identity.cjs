'use strict';
const {Sequelize} = require('sequelize');
module.exports = {
  async up({context: queryInterface}) {
    await queryInterface.createTable('UserIdentities', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      provider: {
        type: Sequelize.STRING,
        allowNull: false
      },
      providerId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      providerEmail: {
        type: Sequelize.STRING,
        allowNull: false
      },
      userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down({context: queryInterface}) {
    await queryInterface.dropTable('UserIdentities');
  }
};
