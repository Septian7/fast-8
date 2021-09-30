'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER(10),
        min: 1
      },
      name: {
        type: Sequelize.STRING(50),
        allowNull: false,
        min: 2
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false,
        min: 5
      },
      phone_number: {
        type: Sequelize.STRING(16),
        min: 8
      },
      jobtittle: {
        type: Sequelize.ENUM('manager','director','staff'),
        allowNull: false,
        defaultValue: 'staff'
      },
      companyId: {
        type: Sequelize.INTEGER(10),
        allowNull: false,
        min: 1
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};