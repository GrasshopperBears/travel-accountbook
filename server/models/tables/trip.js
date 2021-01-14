const Sequelize = require('sequelize');
const sequelize = require('../index');

const Trip = sequelize.define('Trip', {
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
  location_latlng: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  location_name: {
    type: Sequelize.STRING(30),
  },
});

module.exports = Trip;
