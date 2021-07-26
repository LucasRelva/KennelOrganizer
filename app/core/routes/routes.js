const express = require('express')
const dogRoutes = require('./dog.routes')
const KennelRoutes = require('./kennel.routes')

const routes = express.Router()

// routes.use(express.static('app/views'))
// routes.use('/active', express.static('app/views'))
// routes.use('/completed', express.static('app/views'))

// Dog routes
routes.use('/dog', dogRoutes)

//Kennel ROutes
routes.use('/kennel', kennelRoutes)

module.exports = routes