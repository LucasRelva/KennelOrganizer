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

        const dogBehaviors = await dog.getBehaviors()

        return res.json(dogBehaviors)
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
        let first = true
        let dogs = []

        for (behavior of behaviors) {

            const behaviorFound = await Behavior.findOne({
                where: { name: behavior.name }
            })

            if (!behaviorFound) return res.status(400).json({ error: "behavior not found" })

            if (first) {
                const behaviorDogs = await behaviorFound.getDogs()

                dogs.push(behaviorDogs)

                first = false
            } else {
                flatDogs = dogs.flat()

                for (dog in flatDogs) {
                    console.log(flatDogs)
                    const match = await flatDogs[dog].hasBehavior(behaviorFound)

                    if (!match) {
                        flatDogs.splice(dog)
                    }
                }
            }
        }

        return res.json(flatDogs)
    },

    async getBehaviors(req, res) {
        const behaviors = await Behavior.findAll()

        if (!behaviors) return res.status(400).json({ error: "No behavior found" })

        return res.json(behaviors)
    }
}