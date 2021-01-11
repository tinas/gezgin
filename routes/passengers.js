const {passengerDatabase, scooterDatabase, stationDatabase} = require('../database')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const passengers = await passengerDatabase.load()
  res.render('passengers', {passengers})
})

router.post('/', async (req, res) => {
  const passenger = await passengerDatabase.insert(req.body)

  res.send(passenger)
})

router.get('/:passengerId', async (req, res) => {
  const {passengerId} = req.params

  const passenger = await passengerDatabase.find(passengerId)
  res.render('passenger', {passenger})
})

router.delete('/:passengerId', async (req, res) => {
  const {passengerId} = req.params

  await passengerDatabase.removeBy('id', passengerId)

  res.send('OK')
})

router.post('/:passengerId/current-booking', async (req, res) => {
  const {passengerId} = req.params
  const {scooterId} = req.query

  const passenger = await passengerDatabase.find(passengerId)
  const scooter = await scooterDatabase.find(scooterId)

  passenger.book(scooter)

  await passengerDatabase.update(passenger)

  res.send('OK')
})

router.post('/:passengerId/finish-booking', async (req, res) => {
  const {passengerId} = req.params
  const {stationId} = req.query

  const passenger = await passengerDatabase.find(passengerId)
  const station = await stationDatabase.find(stationId)

  passenger.finishedBooking(station)

  await passengerDatabase.update(passenger)

  res.send('OK')
})

module.exports = router
