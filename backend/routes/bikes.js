const {bikeService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  res.send(await bikeService.load())
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const bike = await bikeService.insert({code, brand, pricePerMinute})

  res.send(bike)
})

router.get('/:bikeId', async (req, res) => {
  const {bikeId} = req.params
  res.send(await bikeService.find(bikeId))
})

module.exports = router
