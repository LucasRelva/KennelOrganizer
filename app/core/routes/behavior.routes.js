const express = require('express')
const BehaviorController = require('../controllers/BehaviorController')

const behaviortRoutes = express.Router()

behaviortRoutes.get('/dogs', BehaviorController.getDogs)
behaviortRoutes.get('/', BehaviorController.getBehaviors)
behaviortRoutes.get('/:dogId', BehaviorController.getDogBehaviors)
behaviortRoutes.put('/add/:dogId', BehaviorController.addBehavior)

module.exports = behaviortRoutes
