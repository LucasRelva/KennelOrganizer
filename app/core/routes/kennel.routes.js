const express = require('express')
const KennelController = require('../controllers/KennelController')
const kennelRoutes = express.Router()

kennelRoutes.post('/', KennelController.createKennel)
kennelRoutes.get('/listKennels', KennelController.listAllKennels)
kennelRoutes.get('/findKennel', KennelController.findKennelByName)
kennelRoutes.delete('/deleteKennel/:kennelId', KennelController.deleteKennel)
kennelRoutes.get('/listDogsInKannel/:kennelId', KennelController.listDogs)
kennelRoutes.get('/addDogToKannel/:digId/:kennelId', KennelController.addDogToKennel)
kennelRoutes.get('/removeDogToKannel/:digId/:kennelId', KennelController.removeDogFromKennel)

module.exports = kennelRoutes