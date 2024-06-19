const { Sequelize } = require('sequelize');
require('dotenv').config();

// Configuracion para DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres'
});

module.exports = sequelize;

