'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Companies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Companies.hasMany(models.Employees);
    }
  };
  Companies.init({
    company_name: DataTypes.STRING(50),
    telephone_number: DataTypes.STRING(16),
    is_active: DataTypes.BOOLEAN,
    address: DataTypes.STRING(50)
  }, {
    sequelize,
    modelName: 'Companies',
  });
  return Companies;
};