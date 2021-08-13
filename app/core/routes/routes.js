const express = require('express')
const dogRoutes = require('./dog.routes')
const KennelRoutes = require('./kennel.routes')
const upload = require('../config/app')
const sharp = require('sharp')
const fs = require('fs')

const routes = express.Router()

routes.get("/", (req, res) => {
    return res.render("main.njk", { pageTitle: "TODOS OS CANIS" })
})
// Dog routes
routes.use('/dog', dogRoutes)

//Kennel ROutes
routes.use('/kennel', KennelRoutes)

//upload images
routes.post('/upload', upload.single('photo'), async (req, res) => {
    const file = req.file
    sharp.cache(false)

    const [type, extension] = file.mimetype.split('/')

    if (!fs.existsSync(file.destination)) {
        fs.mkdirSync(file.destination)
    }

    await sharp(file.path).resize(320, 320, {
        fit: 'contain'
    }).toFile(`${file.destination}/${Date.now()}-resized.${extension}`)

    fs.unlinkSync(file.path)

    res.send('deu bom')
})

module.exports = routes