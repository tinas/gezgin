const {stationService, parkingUnitService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const {name} = req.query

  if (name) return res.send(await stationService.findByName(name))

  res.send(await stationService.load())
})

router.post('/', async (req, res) => {
  const {name, location} = req.body

  const station = await stationService.insert({name, location})

  res.send(station)
})

router.get('/:stationId', async (req, res) => {
  const {stationId} = req.params
  res.send(await stationService.find(stationId))
})

router.patch('/:stationId', async (req, res) => {
  const {stationId} = req.params
  const {name, location} = req.body
  const object = {}

  if (name) object.name = name
  if (location) object.location = location

  const station = await stationService.update(stationId, object)

  res.send(station)
})

router.post('/:stationId/parking-units', async (req, res) => {
  const {stationId} = req.params
  const {code, vehicleId, vehicleType} = req.body

  const parkingUnit = await parkingUnitService.insertToStation(code, stationId, vehicleId, vehicleType)

  res.send(parkingUnit)
})

module.exports = router
