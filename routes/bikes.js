const {bikeDatabase} = require('../database')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const bikes = await bikeDatabase.load()

  res.render('bikes', {bikes})
})

router.post('/', async (req, res) => {
  const bike = await bikeDatabase.insert(req.body)

  res.send(bike)
})

router.get('/:bikeId', async (req, res) => {
  const {bikeId} = req.params

  const bike = await bikeDatabase.find(bikeId)

  res.render('bike', {bike})
})

module.exports = router
