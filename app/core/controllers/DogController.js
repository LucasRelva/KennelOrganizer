const { update } = require('../models/Dog')
const { Op } = require('sequelize')
const Dog = require('../models/Dog')
const Kennel = require('../models/Kennel')

module.exports = {
    async createDog(req, res) {
        const { name, image, weight, age, behavior, entryDate } = req.body

        const dog = await Dog.create({ name, image, weight, age, behavior, entryDate })

        if (!dog) return res.status(500).json({ error: 'Dog was not created properly' })

        return res.json(dog)
    },

    async listAllDogs(req, res) {
        const dogs = await Dog.findAll()

        if (!dogs) return res.status(204).json({ error: 'No Dogs were found' })

        return res.json(dogs)
    },

    async deleteDog(req, res) {
        const { dogId } = req.params

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await dog.destroy({ where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogName(req, res) {
        const { dogId } = req.params
        const { name } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ name }, { where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogWeight(req, res) {
        const { weight } = req.body
        const { dogId } = req.params

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + taskId })

        await Dog.update({ weight }, { where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogAge(req, res) {
        const { dogId } = req.params
        const { age } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ age }, { where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogImage(req, res) {
        const { dogId } = req.params
        const { image } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ image }, { where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogBehavior(req, res) {
        const { behavior } = req.body
        const { dogId } = req.params

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ behavior }, { where: { id: dogId } })

        return res.json(dog)
    },

    async updateDogEntryDate(req, res) {
        const { dogId } = req.params
        const { entryDate } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ entryDate }, { where: { id: dogId } })

        return res.json(dog)
    },

    async listNoKennelDogs(req, res) {
        const dogs = await Dog.findAll({
            where: {
                inKennel: false
            }
        })

        if (!dogs) return res.status(204).json({ error: 'All dogs are in kennels' })

        return res.json(dogs)
    },

    async findDogByName(req, res) {
        const { name } = req.body

        const dogs = await Dog.findAll({
            attributes: ['name'],
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })

        if (!dogs) return res.status(204).json({ error: 'No dogs found' })

        return res.json(dogs)
    },

    async updateKennel(req, res) {
        const { dogId, kennelId } = req.params

        const dog = await Dog.findByPk(dogId)
        const kennel = await Kennel.findByPk(kennelId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await dog.setKennel(kennel)

        return res.json(dog)
    },

    async getKennel(req, res) {
        const { dogId } = req.params

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        const kennelName = (await dog.getKennel()).name

        if (!kennelName) return res.json({ error: 'This dog is not in a Kennel' })

        return res.json({ kennelName: kennelName })

    }
}