const express = require('express')
const dogRoutes = require('./dog.routes')
const KennelRoutes = require('./kennel.routes')
const upload = require('../config/app')
const sharp = require('sharp')
const fs = require('fs')

const routes = express.Router()

//frontEnd render routes
routes.get('/', (req, res) => {
    return res.render('main.njk', { pageTitle: 'TODOS OS CANIS' })
})

routes.get('/allDogs', (req, res) => {
    return res.render('allDogs.njk', { pageTitle: 'TODOS OS CACHORROS' })
})

// Dog routes
routes.use('/dog', dogRoutes)

//Kennel ROutes
routes.use('/kennel', KennelRoutes)


module.exports = routes