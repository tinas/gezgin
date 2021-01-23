const {carService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const cars = await carService.load()

  res.render('cars', {cars})
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const car = await carService.insert({code, brand, pricePerMinute})

  res.send(car)
})

router.get('/:carId', async (req, res) => {
  const {carId} = req.params

  const car = await carService.find(carId)

  res.render('car', {car})
})

module.exports = router
