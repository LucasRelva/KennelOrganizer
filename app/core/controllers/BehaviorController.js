const { Op, where } = require('sequelize')
const Behavior = require('../models/Behavior')
const Dog = require('../models/Dog')
const { findAll } = require('../models/Kennel')
const GeneralController = require('../controllers/GeneralController')


// tratar req.bodies para receber somente o nome dos comportamentos

module.exports = {
    async addBehavior(req, res) {
        const { dogId } = req.params
        const behaviors = req.body

        console.log(behaviors)

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(400).json({ error: "dog not found" })

        for (behavior of behaviors) {

            const behaviorFound = await Behavior.findOne({
                where: { name: behavior.name }
            })

            if (!behaviorFound) return res.status(400).json({ error: "behavior not found" })

            await dog.addBehavior(behaviorFound)
        }

        const dogbehaviors = await dog.getBehaviors()

        return res.json(dogbehaviors)
    },

    async getDogBehaviors(req, res) {
        const { dogId } = req.params

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(400).json({ error: "dog not found" })

        const behaviors = await dog.getBehaviors()

        return res.json(behaviors)
    },

    async getDogs(req, res) {
        const behaviors = req.body
        let dogs = []

        for (behavior of behaviors) {

            const behaviorFound = await Behavior.findOne({
                where: { name: behavior.name }
            })

            if (!behaviorFound) return res.status(400).json({ error: "behavior not found" })

            behaviorDogs = await behaviorFound.getDogs()

            dogs.push(behaviorDogs)
        }

        flatDogs = dogs.flat()

        const dogIdArray = Array.from(new Set(flatDogs.map(dog => dog.id)))

        const filteredDogs = dogIdArray.map(id => {
            return flatDogs.find(dog => dog.id === id)
        })

        return res.json(filteredDogs)
    },

    async getBehaviors(req, res) {
        const behaviors = await Behavior.findAll()

        if (!behaviors) return res.status(400).json({ error: "No behavior found" })

        return res.json(behaviors)
    }
}