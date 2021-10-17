const express = require('express')
const dogRoutes = require('./dog.routes')
const kennelRoutes = require('./kennel.routes')
const behaviorRoutes = require('./behavior.routes')
const upload = require('../config/app')
const sharp = require('sharp')
const fs = require('fs')

const routes = express.Router()

//frontEnd render routes
routes.get('/', (req, res) => {
    return res.render('main.njk', { pageTitle: 'Kennel Organizer' })
})

routes.get('/choose', (req, res) => {
    return res.render('main.njk', { pageTitle: 'Escolha o canil' })
})

routes.get('/allDogs', (req, res) => {
    return res.render('allDogs.njk', { pageTitle: 'Todos os cachorros presentes' })
})

routes.get('/noKennelDogs', (req, res) => {
    return res.render('noKennelDogs.njk', { pageTitle: 'Cachorros sem canil' })
})

routes.get('/adoptedDogs', (req, res) => {
    return res.render('allDogs.njk', { pageTitle: 'Cachorros adoatdos' })
})

routes.get('/outerDogs', (req, res) => {
    return res.render('allDogs.njk', { pageTitle: 'Cachorros ausentes' })
})

// Dog routes
routes.use('/dog', dogRoutes)

//Kennel ROutes
routes.use('/kennel', kennelRoutes)

//behaviorDogs routes
routes.use('/behavior', behaviorRoutes)

module.exports = routes