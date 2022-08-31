'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Suggest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Suggest.init({
    guildId: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    nickname: DataTypes.STRING,
    suggest: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Suggest',
  });
  return Suggest;
};