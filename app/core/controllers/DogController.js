const { Op } = require('sequelize')
const Dog = require('../models/Dog')
const Kennel = require('../models/Kennel')
const sharp = require('sharp')
const fs = require('fs')

module.exports = {
    async createDog(req, res) {
        const { name, weight, age, behavior, entryDate } = req.body
        const file = req.file

        sharp.cache(false)



        const [type, extension] = file.mimetype.split('/')
        const image = `${Date.now()}-resized.${extension}`

        await sharp(file.path).resize(400, 400, {
            fit: 'contain'
        }).toFile(file.destination + image)

        fs.unlinkSync(file.path)

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

        const kennel = await dog.getKennel()

        if (!kennel) return res.json({ error: 'This dog is not in a Kennel' })

        return res.json({ kennelName: kennel.name })

    },

    async updateDogInfo(req, res) {
        const { dogId } = req.params
        const { entryDate, name, weight, age, behavior, image } = req.body

        const dog = await Dog.findByPk(dogId)

        if (!dog) return res.status(204).json({ error: 'No dog was found with the id: ' + dogId })

        await Dog.update({ behavior, entryDate, name, image, weight, age }, { where: { id: dogId } })

        return res.json(dog)
    }
}