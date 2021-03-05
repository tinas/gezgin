const passengersRouter = require('./passengers')
const stationsRouter = require('./stations')
const parkingUnitsRouter = require('./parking-units')
const bikesRouter = require('./bikes')
const scootersRouter = require('./scooters')
const carsRouter = require('./cars')

module.exports = app => {
  app.use('/passengers', passengersRouter)
  app.use('/stations', stationsRouter)
  app.use('/parking-units', parkingUnitsRouter)
  app.use('/bikes', bikesRouter)
  app.use('/scooters', scootersRouter)
  app.use('/cars', carsRouter)
}
