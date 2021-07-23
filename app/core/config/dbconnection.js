const Sequelize = require('sequelize');
const dbConfig = require('./database')

const connection = new Sequelize(dbConfig)


module.exports = connection