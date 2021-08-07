const express = require('express')
const cors = require('cors')
const routes = require('../routes/routes')
const path = require('path')
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

app.use(express.json())
app.use(cors())

app.use(routes)

server.listen(port, () => {
    console.log('Server running at ' + port)
})

