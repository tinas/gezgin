const {bikeService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const bikes = await bikeService.load()

  res.render('bikes', {bikes})
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const bike = await bikeService.insert({code, brand, pricePerMinute})

  res.send(bike)
})

router.get('/:bikeId', async (req, res) => {
  const {bikeId} = req.params

  const bike = await bikeService.find(bikeId)

  res.render('bike', {bike})
})

module.exports = router
