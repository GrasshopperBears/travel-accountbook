const Sequelize = require('sequelize');
const sequelize = require('../index');

const Payment = sequelize.define('Payment', {
  id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  trip_id: {
    type: Sequelize.INTEGER(8).UNSIGNED,
    references: { model: 'Trips', key: 'id' },
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER(8).UNSIGNED,
    references: { model: 'Users', key: 'id' },
    allowNull: false,
  },
  category_id: {
    type: Sequelize.INTEGER(10).UNSIGNED,
    references: { model: 'Categories', key: 'id' },
  },
  title: {
    type: Sequelize.STRING(30),
    allowNull: false,
  },
  amount: {
    type: Sequelize.INTEGER(15),
    allowNull: false,
  },
  date: {
    type: Sequelize.DATEONLY,
  },
  location_latlng: {
    type: Sequelize.GEOMETRY('POINT'),
  },
  location_name: {
    type: Sequelize.STRING(30),
  },
  place_url: {
    type: Sequelize.STRING,
  },
  memo: {
    type: Sequelize.TEXT,
  },
});

module.exports = Payment;
