const app = require('../..')
const request = require('supertest')(app)

test('creates a new car', async done => {
  const carToCreate = {
    code: '459963',
    brand: 'Tesla',
    pricePerMinute: 5
  }

  const response = await request.post('/cars').send(carToCreate).expect(200)

  expect(response.body).toMatchObject(carToCreate)

  done()
})

test('gets all cars', async done => {
  const carsResponse = await request.get('/cars').expect(200)

  carsResponse.body.forEach(car => {
    expect(car).toHaveProperty('_id')
    expect(car).toHaveProperty('code')
    expect(car).toHaveProperty('brand')
    expect(car).toHaveProperty('pricePerMinute')
    expect(car.code).toHaveLength(6)
  })

  done()
})

test('gets a single car', async done => {
  const carToCreate = {
    code: '459963',
    brand: 'Tesla',
    pricePerMinute: 5
  }

  const carCreatedResponse = await request.post('/cars').send(carToCreate).expect(200)
  const carResponse = await request.get(`/cars/${carCreatedResponse.body._id}`).expect(200)

  expect(carResponse.body).toMatchObject(carCreatedResponse.body)

  done()
})
