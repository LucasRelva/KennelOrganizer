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
    console.log(req)

    const [type, extension] = file.mimetype.split('/')
    const finalPath = `${file.destination}/${Date.now()}-resized.${extension}`

    await sharp(file.path).resize(320, 320, {
        fit: 'contain'
    }).toFile(finalPath)

    fs.unlinkSync(file.path)


    return res.json(req.body)
})

module.exports = routes