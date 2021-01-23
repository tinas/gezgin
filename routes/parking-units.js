const {parkingUnitService} = require('../services')

const router = require('express').Router()

router.patch('/:parkingUnitId', async (req, res) => {
  const {parkingUnitId} = req.params
  const {vehicleId, vehicleType} = req.body

  const parkingUnit = await parkingUnitService.updateVehicle(parkingUnitId, vehicleId, vehicleType)

  res.send(parkingUnit)
})

module.exports = router
