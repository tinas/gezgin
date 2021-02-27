const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./mongo-connection')

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.set('view engine', 'pug')

require('./routes/routers')(app)

module.exports = app
