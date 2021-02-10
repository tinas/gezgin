const app = require('../..')
const request = require('supertest')(app)

test('creates a new scooter', async done => {
  const scooterToCreate = {
    code: '997866',
    brand: 'Razor E300',
    pricePerMinute: 1.5
  }

  const response = await request.post('/scooters').send(scooterToCreate).expect(200)

  expect(response.body).toMatchObject(scooterToCreate)

  done()
})

test('gets all scooters', async done => {
  const scootersResponse = await request.get('/scooters').expect(200)

  scootersResponse.body.forEach(scooter => {
    expect(scooter).toHaveProperty('_id')
    expect(scooter).toHaveProperty('code')
    expect(scooter).toHaveProperty('brand')
    expect(scooter).toHaveProperty('pricePerMinute')
    expect(scooter.code).toHaveLength(6)
  })

  done()
})

test('gets a single scooter', async done => {
  const scooterToCreate = {
    code: '997866',
    brand: 'Razor E300',
    pricePerMinute: 1.5
  }

  const scooterCreatedResponse = await request.post('/scooters').send(scooterToCreate).expect(200)
  const scooterResponse = await request.get(`/scooters/${scooterCreatedResponse.body._id}`).expect(200)

  expect(scooterResponse.body).toMatchObject(scooterCreatedResponse.body)

  done()
})
