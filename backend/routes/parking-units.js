const {parkingUnitService} = require('../services')

const router = require('express').Router()

router.get('/available', async (req, res) => {
  const {stationId} = req.body
  const query = {station: stationId, state: 0}
  res.send(await parkingUnitService.query(query))
})

router.get('/:parkingUnitCode', async (req, res, next) => {
  const {parkingUnitCode} = req.params

  const parkingUnit = await parkingUnitService.findBy('code', parkingUnitCode)

  if (!parkingUnit.length) return next(new Error('Parking Unit not found'))

  res.send(parkingUnit)
})

router.patch('/:parkingUnitId', async (req, res) => {
  const {parkingUnitId} = req.params
  const {vehicleId, vehicleType} = req.body

  const parkingUnit = await parkingUnitService.updateVehicle(parkingUnitId, vehicleId, vehicleType)

  res.send(parkingUnit)
})

router.patch('/:parkingUnitId/state', async (req, res) => {
  const {parkingUnitId} = req.params
  const {state} = req.body

  const parkingUnit = await parkingUnitService.update(parkingUnitId, {state})

  res.send(parkingUnit)
})

module.exports = router
