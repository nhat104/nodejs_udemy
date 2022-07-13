const Sequelize = require('sequelize');

const sequelize = new Sequelize('test-database', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  define: { timestamps: false },
});

module.exports = sequelize;
