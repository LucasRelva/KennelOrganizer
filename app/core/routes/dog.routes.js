const express = require('express')
const upload = require('../config/app')
const DogController = require('../controllers/DogController')

const dogRoutes = express.Router()

dogRoutes.get('/', DogController.listAllDogs)
dogRoutes.get('/noKennel', DogController.listNoKennelDogs)
dogRoutes.get('/find', DogController.findDogByName)
dogRoutes.get('/kennel/:dogId', DogController.getKennel)
dogRoutes.delete('/:dogId', DogController.deleteDog)
dogRoutes.put('/:dogId', DogController.updateDogInfo)
dogRoutes.put('/:dogId/:kennelId', DogController.updateKennel)
dogRoutes.post('/', upload.single('image'), DogController.createDog)

module.exports = dogRoutes