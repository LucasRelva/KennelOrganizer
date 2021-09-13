const { Op, where } = require('sequelize')
const Behavior = require('../models/Behavior')
const Dog = require('../models/Dog')
const { findAll } = require('../models/Kennel')
const GeneralController = require('../controllers/GeneralController')


module.exports = {
    async addBehavior(req, res) {
        const { dogId } = req.params
        const { names } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(400).json({ error: "dog not found" })

        for (name of names) {

            const behavior = await Behavior.findOne({
                where: { name }
            })

            if (!behavior) return res.status(400).json({ error: "behavior not found" })

            dog.addBehavior(behavior)
        }

        return res.json(dog.getBehaviors)
    }
}