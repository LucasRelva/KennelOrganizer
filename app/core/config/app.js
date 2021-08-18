const express = require('express')
const cors = require('cors')
const path = require('path')
const multer = require('multer')
const port = 8080

require('./dbconnection')

const app = express()

const server = require('http').createServer(app)
app.use(express.static(path.join(__dirname + '..', '..', '..', 'views')))

const nunjucks = require("nunjucks")
nunjucks.configure(path.join(__dirname + '..', '..', '..', 'views'), {
    autoescape: true,
    express: app,
    noCache: true
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname + '..', '..', '..', 'views', 'images'))
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
})

const upload = multer({ storage })

module.exports = upload

app.use(express.json())
app.use(cors())

const routes = require('../routes/routes')

app.use(routes)

server.listen(port, () => {
    console.log('Server running at ' + port)
})


