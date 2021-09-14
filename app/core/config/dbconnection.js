const Sequelize = require('sequelize');
const dbConfig = require('./database')
const Dog = require('../models/Dog')
const Kennel = require('../models/Kennel')
const Behavior = require('../models/Behavior')

const connection = new Sequelize(dbConfig)

Dog.init(connection)
Kennel.init(connection)
Behavior.init(connection)

Dog.associate(connection.models)
Kennel.associate(connection.models)
Behavior.associate(connection.models)

module.exports = connection