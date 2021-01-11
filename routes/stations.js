const {stationDatabase} = require('../database')

const router = require('express').Router()

router.get('/', async (req, res) => {
  const stations = await stationDatabase.load()
  res.render('stations', {stations})
})

router.post('/', async (req, res) => {
  const station = await stationDatabase.insert(req.body)

  res.send(station)
})

router.get('/:stationId', async (req, res) => {
  const {stationId} = req.params

  const station = await stationDatabase.find(stationId)
  res.render('station', {station})
})

router.delete('/:stationId', async (req, res) => {
  const {stationId} = req.params

  await stationDatabase.removeBy('id', stationId)

  res.send('OK')
})

module.exports = router
