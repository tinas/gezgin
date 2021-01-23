const {stationService, parkingUnitService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const stations = await stationService.load()
  res.render('stations', {stations})
})

router.post('/', async (req, res) => {
  const {name, location} = req.body

  const station = await stationService.insert({name, location})

  res.send(station)
})

router.get('/:stationId', async (req, res) => {
  const {stationId} = req.params

  const station = await stationService.find(stationId)

  res.render('station', {station})
})

router.delete('/:stationId', async (req, res) => {
  const {stationId} = req.params

  await stationService.removeBy('id', stationId)

  res.send('OK')
})

router.post('/:stationId/parking-units', async (req, res) => {
  const {stationId} = req.params
  const {code, state, vehicleId, vehicleType} = req.body

  const parkingUnit = await parkingUnitService.insertToStation(code, state, stationId, vehicleId, vehicleType)

  res.send(parkingUnit)
})

module.exports = router
