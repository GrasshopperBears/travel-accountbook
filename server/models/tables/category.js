const Sequelize = require('sequelize');
const sequelize = require('../index');

const Category = sequelize.define('Category', {
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER(8).UNSIGNED,
    references: { model: 'Users', key: 'id' },
    allowNull: false,
  },
  title: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
});

module.exports = Category;
