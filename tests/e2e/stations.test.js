const app = require('../..')
const request = require('supertest')(app)

test('creates a new station', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const response = await request.post('/stations').send(stationToCreate).expect(200)

  const stationResponseBody = response.body

  expect(stationResponseBody).toMatchObject(stationToCreate)
  expect(stationResponseBody.parkingUnits).toEqual([])
  expect(stationResponseBody.location).toHaveLength(2)

  done()
})

test('gets all stations', async done => {
  const stationsResponse = await request.get('/stations').expect(200)

  stationsResponse.body.forEach(station => {
    expect(station).toHaveProperty('_id')
    expect(station).toHaveProperty('name')
    expect(station).toHaveProperty('location')
    expect(station).toHaveProperty('parkingUnits')
    expect(station.location).toHaveLength(2)
  })

  done()
})

test('gets a single station', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const stationResponse = await request.get(`/stations/${stationCreatedResponse.body._id}`).expect(200)

  expect(stationResponse.body).toMatchObject(stationCreatedResponse.body)

  done()
})

test('gets a single station by name', async done => {
  const stationToCreate = {
    name: 'Maltepe',
    location: ['11.11', '11.11']
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const stationResponse = await request.get(`/stations?name=${stationCreatedResponse.body.name}`).expect(200)

  expect(stationResponse.body).toEqual(expect.arrayContaining([expect.objectContaining({name: 'Maltepe'})]))

  done()
})

test('patches a station information (with parameters)', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const stationToPatch = {
    name: 'Maltepe',
    location: ['9.45', '22.88']
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  await request.patch(`/stations/${stationCreatedResponse.body._id}`).send(stationToPatch).expect(200)
  const stationPatchedResponse = await request.get(`/stations/${stationCreatedResponse.body._id}`).expect(200)

  expect(stationPatchedResponse.body).toMatchObject(stationToPatch)

  done()
})

test('patches a station information (without parameters)', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  await request.patch(`/stations/${stationCreatedResponse.body._id}`).send({}).expect(200)
  const stationPatchedResponse = await request.get(`/stations/${stationCreatedResponse.body._id}`).expect(200)

  expect(stationPatchedResponse.body).toMatchObject(stationCreatedResponse.body)

  done()
})

test('adds parking unit with vehicle to station', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const bikeToCreate = {
    code: '101122',
    brand: 'Giant',
    pricePerMinute: 1
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const bikeCreatedResponse = await request.post('/bikes').send(bikeToCreate).expect(200)
  const parkingUnitCreatedResponse = await request
    .post(`/stations/${stationCreatedResponse.body._id}/parking-units`)
    .send({
      code: '655556',
      vehicleId: bikeCreatedResponse.body._id,
      vehicleType: 'Bike'
    })
    .expect(200)

  const parkingUnitCreated = parkingUnitCreatedResponse.body

  expect(parkingUnitCreated.station._id).toEqual(stationCreatedResponse.body._id)
  expect(parkingUnitCreated.vehicle._id).toEqual(bikeCreatedResponse.body._id)
  expect(parkingUnitCreated).toHaveProperty('code', '655556')
  expect(parkingUnitCreated).toHaveProperty('state', 0)
  expect(parkingUnitCreated).toHaveProperty('vehicleType', 'Bike')

  done()
})

test('adds a vehicle-free parking unit to the station', async done => {
  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const parkingUnitCreatedResponse = await request
    .post(`/stations/${stationCreatedResponse.body._id}/parking-units`)
    .send({
      code: '467733',
      vehicleType: 'Scooter'
    })
    .expect(200)

  const parkingUnitCreated = parkingUnitCreatedResponse.body

  expect(parkingUnitCreated.station._id).toEqual(stationCreatedResponse.body._id)
  expect(parkingUnitCreated.vehicle).toBeNull()
  expect(parkingUnitCreated).toHaveProperty('code', '467733')
  expect(parkingUnitCreated).toHaveProperty('state', 1)
  expect(parkingUnitCreated).toHaveProperty('vehicleType', 'Scooter')

  done()
})
