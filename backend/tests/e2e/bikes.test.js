const app = require('../..')
const request = require('supertest')(app)

test('creates a new bike', async done => {
  const bikeToCreate = {
    code: '101122',
    brand: 'Giant',
    pricePerMinute: 1
  }

  const response = await request.post('/bikes').send(bikeToCreate).expect(200)

  expect(response.body).toMatchObject(bikeToCreate)

  done()
})

test('gets all bikes', async done => {
  const bikesResponse = await request.get('/bikes').expect(200)

  bikesResponse.body.forEach(bike => {
    expect(bike).toHaveProperty('_id')
    expect(bike).toHaveProperty('code')
    expect(bike).toHaveProperty('brand')
    expect(bike).toHaveProperty('pricePerMinute')
    expect(bike.code).toHaveLength(6)
  })

  done()
})

test('gets a single bike', async done => {
  const bikeToCreate = {
    code: '101122',
    brand: 'Giant',
    pricePerMinute: 1
  }

  const bikeCreatedResponse = await request.post('/bikes').send(bikeToCreate).expect(200)
  const bikeResponse = await request.get(`/bikes/${bikeCreatedResponse.body._id}`).expect(200)

  expect(bikeResponse.body).toMatchObject(bikeCreatedResponse.body)

  done()
})
