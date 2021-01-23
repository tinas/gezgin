const {scooterService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const scooters = await scooterService.load()

  res.render('scooters', {scooters})
})

router.post('/', async (req, res) => {
  const {code, brand, pricePerMinute} = req.body

  const scooter = await scooterService.insert({code, brand, pricePerMinute})

  res.send(scooter)
})

router.get('/:scooterId', async (req, res) => {
  const {scooterId} = req.params

  const scooter = await scooterService.find(scooterId)

  res.render('scooter', {scooter})
})

module.exports = router
