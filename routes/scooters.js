const {scooterService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  res.send(await scooterService.load())
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const scooter = await scooterService.insert({code, brand, pricePerMinute})

  res.send(scooter)
})

router.get('/:scooterId', async (req, res) => {
  const {scooterId} = req.params
  res.send(await scooterService.find(scooterId))
})

module.exports = router
