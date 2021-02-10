const {carService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  res.send(await carService.load())
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const car = await carService.insert({code, brand, pricePerMinute})

  res.send(car)
})

router.get('/:carId', async (req, res) => {
  const {carId} = req.params
  res.send(await carService.find(carId))
})

module.exports = router
