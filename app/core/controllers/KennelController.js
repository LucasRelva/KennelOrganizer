const { Op, where } = require('sequelize')
const Kennel = require('../models/Kennel')
const Dog = require('../models/Dog')
const { findAll } = require('../models/Kennel')
const GeneralController = require('../controllers/GeneralController')


module.exports = {
    async createKennel(req, res) {
        const { name } = req.body

        const kennel = await Kennel.create({ name, isActive: true })

        if (!kennel) return res.status(500).json({ error: 'Kennel was not created properly' })

        return res.json(kennel)
    },

    async listAllKennels(req, res) {
        const kennel = await Kennel.findAll()

        if (!kennel) return res.status(204).json({ error: 'No kennels' })

        return res.json(kennel)
    },

    async findKennelByName(req, res) {
        const { name } = req.body

        const kennel = await Kennel.findAll({
            attributes: ['name'],
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        })

        if (!kennel) return res.status(204).json({ error: 'No kennel found' })

        return res.json(kennel)
    },

    async deleteKennel(req, res) {
        const { kennelId } = req.params

        const kennel = await Kennel.findByPk(kennelId)

        if (!kennel) return res.status(204).json({ error: 'kennel not existing' })

        const dogs = await kennel.getDogs()

        for (dog of dogs) {
            updateInKennel(dog.id)
        }

        await kennel.setDogs([])

        await Kennel.destroy({ where: { id: kennelId } })

        return res.json(kennel)

    },

    async listDogs(req, res) {
        const { kennelId } = req.params

        const kennel = await Kennel.findByPk(kennelId)

        if (!kennel) return res.status(204).json({ error: 'kennel not existing' })

        const dogs = await kennel.getDogs()

        if (!dogs) return res.status(204).json({ error: 'No dogs found' })

        return res.json(dogs)

    },

    async addDogToKennel(req, res) {
        const { dogId, kennelId } = req.params

        const dog = await Dog.findByPk(dogId)
        const kennel = await Kennel.findByPk(kennelId)

        console.log("---------------------" + dog, kennel);

        if (!dog || !kennel) return res.status(204).json({ erro: 'not found' })


        await kennel.addDog(dog)

        GeneralController.updateInKannel(dogId)

        return res.json(kennel)
    },

    async removeDogFromKennel(req, res) {
        const { dogId, kennelId } = req.params

        const dog = await Dog.findByPk(dogId)
        const kennel = await Kennel.findByPk(kennelId)

        if (!dog || !kennel) return res.status(404).json({ erro: 'not found' })

        await kennel.removeDog(dog)

        GeneralController.updateInKannel(dogId)

        return res.json(kennel)
    },

    async updateKennelName(req, res) {
        const { kennelId } = req.params
        const { name } = req.body

        const kennel = await Kennel.findByPk(kennelId)

        if (!kennel) return res.status(204).json({ error: 'No kennl was found with the id: ' + kennelId })

        await Kennel.update({ name }, { where: { id: kennelId } })

        return res.json(kennel)
    },

    async countDogs(req, res) {
        const { kennelId } = req.params

        const kennel = await Kennel.findByPk(kennelId)

        if (!kennel) return res.status(204).json({ error: 'No kennl was found with the id: ' + kennelId })

        const dogsCount = await kennel.countDogs()

        return res.json(dogsCount)

    }
}