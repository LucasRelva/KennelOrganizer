const express = require('express')
const cors = require('cors')
//const routes = require('../routes/routes')
const port = 8000

require('./dbconnection')

const app = express()
const server = require('http').createServer(app)

app.use(express.json())
app.use(cors())

//app.use(routes)

server.listen(port, () => {
    console.log('Server running at ' + port)
})