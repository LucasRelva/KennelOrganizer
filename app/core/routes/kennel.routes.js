const express = require('express')
const KennelController = require('../controllers/KennelController')
const kennelRoutes = express.Router()

kennelRoutes.post('/', KennelController.createKennel)
kennelRoutes.get('/', KennelController.listAllKennels)
kennelRoutes.get('/find', KennelController.findKennelByName)
kennelRoutes.delete('/:kennelId', KennelController.deleteKennel)
kennelRoutes.get('/listDogs/:kennelId', KennelController.listDogs)
kennelRoutes.put('/addDog/:dogId/:kennelId', KennelController.addDogToKennel)
kennelRoutes.put('/removeDog/:dogId/:kennelId', KennelController.removeDogFromKennel)
kennelRoutes.put('/name/:kennelId', KennelController.updateKennelName)
kennelRoutes.get('/:kennelId', KennelController.countDogs)


module.exports = kennelRoutes