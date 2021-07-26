const express = require('express')
const DogController = require('../controllers/DogController')

const dogRoutes = express.Router()

dogRoutes.get('/', DogController.listAllDogs)
dogRoutes.get('/noKennel', DogController.listNoKennelDogs)
dogRoutes.get('/find', DogController.findDogByName)
dogRoutes.get('/kennel/:dogId', DogController.getKennel)
dogRoutes.delete('/:dogId', DogController.deleteDog)
dogRoutes.put('/name/:dogId', DogController.updateDogName)
dogRoutes.put('/age/:dogId', DogController.updateDogAge)
dogRoutes.put('/image/:dogId', DogController.updateDogImage)
dogRoutes.put('/weight/:dogId', DogController.updateDogWeight)
dogRoutes.put('/behavior/:dogId', DogController.updateDogBehavior)
dogRoutes.put('/entryDate/:dogId', DogController.updateDogEntryDate)
dogRoutes.put('/:dogId/:kennelId', DogController.updateKennel)
dogRoutes.post('/', DogController.createDog)

module.exports = dogRoutes