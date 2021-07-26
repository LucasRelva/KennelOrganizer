const express = require('express')
const KennelController = require('../controllers/KennelController')
const kennelRoutes = express.Router()

kennelRoutes.post('/', KennelController.createKennel)
kennelRoutes.get('/', KennelController.listAllKennels)
kennelRoutes.get('/find', KennelController.findKennelByName)
kennelRoutes.delete('/:kennelId', KennelController.deleteKennel)//testar depois de adicionar um cachorro ao canil
kennelRoutes.get('/listDogs/:kennelId', KennelController.listDogs)
kennelRoutes.put('/addDog/:dogId/:kennelId', KennelController.addDogToKennel)
kennelRoutes.put('/removeDog/:dogId/:kennelId', KennelController.removeDogFromKennel)

module.exports = kennelRoutes