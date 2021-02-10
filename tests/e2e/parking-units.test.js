const app = require('../..')
const request = require('supertest')(app)

test('gets available parking units', async done => {
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

  await request
    .post(`/stations/${stationCreatedResponse.body._id}/parking-units`)
    .send({
      code: '655556',
      vehicleId: bikeCreatedResponse.body._id,
      vehicleType: 'Bike'
    })
    .expect(200)

  const parkingUnitsResponse = await request
    .get('/parking-units/available')
    .send({
      stationId: stationCreatedResponse.body._id
    })
    .expect(200)

  expect(parkingUnitsResponse.body).toEqual(expect.arrayContaining([expect.objectContaining({state: 0})]))

  done()
})

test('patches a parking unit (with parameters)', async done => {
  const bikeToCreate = {
    code: '210088',
    brand: 'Bisan',
    pricePerMinute: 0.5
  }

  const biketoPatch = {
    code: '577936',
    brand: 'Corelli',
    pricePerMinute: 2
  }

  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const bikeCreatedResponse = await request.post('/bikes').send(bikeToCreate).expect(200)
  const bikePatchedResponse = await request.post('/bikes').send(biketoPatch).expect(200)
  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const parkingUnitCreatedResponse = await request
    .post(`/stations/${stationCreatedResponse.body._id}/parking-units`)
    .send({
      code: '778899',
      vehicleId: bikeCreatedResponse.body._id,
      vehicleType: 'Bike'
    })
    .expect(200)

  const parkingUnitPatchedResponse = await request
    .patch(`/parking-units/${parkingUnitCreatedResponse.body._id}`)
    .send({
      vehicleId: bikePatchedResponse.body._id,
      vehicleType: 'Bike'
    })
    .expect(200)

  const parkingUnitPatched = parkingUnitPatchedResponse.body

  expect(parkingUnitPatched._id).toEqual(parkingUnitCreatedResponse.body._id)
  expect(parkingUnitPatched.station).toEqual(stationCreatedResponse.body._id)
  expect(parkingUnitPatched.vehicle).not.toBeNull()
  expect(parkingUnitPatched).toHaveProperty('code', '778899')
  expect(parkingUnitPatched).toHaveProperty('state', 0)
  expect(parkingUnitPatched).toHaveProperty('vehicleType', 'Bike')

  done()
})

test('patches a parking unit (without parameters)', async done => {
  const bikeToCreate = {
    code: '210088',
    brand: 'Bisan',
    pricePerMinute: 0.5
  }

  const stationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const bikeCreatedResponse = await request.post('/bikes').send(bikeToCreate).expect(200)
  const stationCreatedResponse = await request.post('/stations').send(stationToCreate).expect(200)
  const parkingUnitCreatedResponse = await request
    .post(`/stations/${stationCreatedResponse.body._id}/parking-units`)
    .send({
      code: '778899',
      vehicleId: bikeCreatedResponse.body._id,
      vehicleType: 'Bike'
    })
    .expect(200)
  await request.patch(`/parking-units/${parkingUnitCreatedResponse.body._id}`).send({vehicleType: 'Bike'}).expect(200)
  const stationResponse = await request.get(`/stations/${stationCreatedResponse.body._id}`).expect(200)

  const parkingUnitPatched = stationResponse.body.parkingUnits[0]

  expect(parkingUnitPatched._id).toEqual(parkingUnitCreatedResponse.body._id)
  expect(parkingUnitPatched.station).toEqual(stationCreatedResponse.body._id)
  expect(parkingUnitPatched.vehicle).toBeNull()
  expect(parkingUnitPatched).toHaveProperty('code', '778899')
  expect(parkingUnitPatched).toHaveProperty('state', 1)
  expect(parkingUnitPatched).toHaveProperty('vehicleType', 'Bike')

  done()
})
