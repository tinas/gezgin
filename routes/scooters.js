const {scooterDatabase} = require('../database')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const scooters = await scooterDatabase.load()

  res.render('scooters', {scooters})
})

router.post('/', async (req, res) => {
  const scooter = await scooterDatabase.insert(req.body)

  res.send(scooter)
})

router.get('/:scooterId', async (req, res) => {
  const {scooterId} = req.params

  const scooter = await scooterDatabase.find(scooterId)

  res.render('scooter', {scooter})
})

module.exports = router
