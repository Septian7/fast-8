'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Employees extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Employees.belongsTo(models.Companies)
    }
  };
  Employees.init({
    name: DataTypes.STRING(50),
    email: DataTypes.STRING(225),
    phone_number: DataTypes.STRING(16),
    jobtittle: DataTypes.ENUM('manager','director','staff'),
    companyId: DataTypes.INTEGER(10)
  }, {
    sequelize,
    modelName: 'Employees',
  });
  return Employees;
};