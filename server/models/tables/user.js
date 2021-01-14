const Sequelize = require('sequelize');
const sequelize = require('../index');

const User = sequelize.define('User', {
  id: {
    type: Sequelize.INTEGER(8).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  uid: {
    type: Sequelize.STRING(45),
    allowNull: false,
  },
  nickname: {
    type: Sequelize.STRING(45),
  },
  thumbnail_img_url: {
    type: Sequelize.STRING(200),
  },
  password: {
    type: Sequelize.STRING(60),
  },
  provider: {
    type: Sequelize.STRING(20),
    allowNull: false,
  },
});

module.exports = User;
