const {parkingUnitService} = require('../services')

const router = require('express').Router()

router.get('/available', async (req, res) => {
  const {stationId} = req.body
  const query = {station: stationId, state: 0}
  res.send(await parkingUnitService.query(query))
})

router.get('/:parkingUnitCode', async (req, res) => {
  const {parkingUnitCode} = req.params
  res.send(await parkingUnitService.findBy('code', parkingUnitCode))
})

router.patch('/:parkingUnitId', async (req, res) => {
  const {parkingUnitId} = req.params
  const {vehicleId, vehicleType} = req.body

  const parkingUnit = await parkingUnitService.updateVehicle(parkingUnitId, vehicleId, vehicleType)

  res.send(parkingUnit)
})

module.exports = router
