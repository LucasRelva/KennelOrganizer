const Sequelize = require('sequelize');
const dbConfig = require('./database')
const Dog = require('../models/Dog')
const Kennel = require('../models/Kennel')

const connection = new Sequelize(dbConfig)

Dog.init(connection)
Kennel.init(connection)

Dog.associate(connection.models)
Kennel.associate(connection.models)

module.exports = connection