const Sequelize = require('sequelize');

const sequelize = require('../utils/database');

const Cart = sequelize.define('cart', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  // userId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  // productId: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
  // quantity: {
  //   type: Sequelize.INTEGER,
  //   allowNull: false,
  // },
});

module.exports = Cart;
