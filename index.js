const express = require('express')
const bodyParser = require('body-parser')
const indexRouter = require('./routes/index')
const passengersRouter = require('./routes/passengers')
const stationsRouter = require('./routes/stations')
const bikesRouter = require('./routes/bikes')
const scootersRouter = require('./routes/scooters')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

app.use('/', indexRouter)
app.use('/passengers', passengersRouter)
app.use('/stations', stationsRouter)
app.use('/bikes', bikesRouter)
app.use('/scooters', scootersRouter)

app.listen(3000, () => {
  console.log('app listening on 3000')
})
