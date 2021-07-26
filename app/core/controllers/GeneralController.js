const Dog = require('../models/Dog')
module.exports = {
    async updateInKannel(dogId) {
        const dog = await Dog.findByPk(dogId)

        if(!dog) return res.status(204).json({error: 'No dogs found'})

        dog.inKennel == true ? await Dog.update({ inKennel: false }, { where: { id: dogId } }) :
            await Dog.update({ inKennel: true }, { where: { id: dogId } })

        return
    }
}