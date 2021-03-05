const {passengerService, bookingService} = require('../services')

const router = require('express').Router()

router.get('/', async (req, res) => {
  res.send(await passengerService.load())
})

router.post('/', async (req, res) => {
  const {name, phone, email} = req.body

  const passenger = await passengerService.insert({name, phone, email})

  res.send(passenger)
})

router.get('/:passengerId', async (req, res) => {
  const {passengerId} = req.params
  res.send(await passengerService.find(passengerId))
})

router.delete('/:passengerId', async (req, res) => {
  const {passengerId} = req.params

  await passengerService.removeBy('id', passengerId)

  res.send('OK')
})

router.patch('/:passengerId', async (req, res) => {
  const {passengerId} = req.params
  const {name, phone, email} = req.body
  const object = {}

  if (name) object.name = name
  if (phone) object.phone = phone
  if (email) object.email = email

  const passenger = await passengerService.update(passengerId, object)

  res.send(passenger)
})

router.post('/:passengerId/current-booking', async (req, res) => {
  const {passengerId} = req.params
  const {parkingUnitId} = req.body

  const booking = await bookingService.book(passengerId, parkingUnitId)

  res.send(booking)
})

router.post('/:passengerId/bookings', async (req, res) => {
  const {passengerId} = req.params
  const {destinationId, totalPrice} = req.body

  const booking = await bookingService.finishBook(passengerId, destinationId, totalPrice)

  res.send(booking)
})

router.post('/login', async (req, res, next) => {
  const {email} = req.body

  const passenger = await passengerService.findBy('email', email)

  if (!passenger.length) return next(new Error('Passenger not found'))

  res.send(passenger)
})

module.exports = router
