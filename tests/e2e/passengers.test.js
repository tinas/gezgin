const app = require('../..')
const request = require('supertest')(app)

test('creates a new passenger', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0505110',
    email: 'ahmet@gmail.com'
  }

  const response = await request.post('/passengers').send(passengerToCreate).expect(200)

  expect(response.body).toMatchObject(passengerToCreate)

  done()
})

test('gets all passengers', async done => {
  const passengersResponse = await request.get('/passengers').expect(200)

  passengersResponse.body.forEach(passenger => {
    expect(passenger).toHaveProperty('_id')
    expect(passenger).toHaveProperty('name')
    expect(passenger).toHaveProperty('phone')
    expect(passenger).toHaveProperty('_id')
    expect(passenger).toHaveProperty('bookings')
  })

  done()
})

test('gets a single passenger', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0533115',
    email: 'ahmet@gmail.com'
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const passengerResponse = await request.get(`/passengers/${passengerCreatedResponse.body._id}`).expect(200)

  expect(passengerResponse.body).toMatchObject(passengerCreatedResponse.body)

  done()
})

test('deletes a one passenger', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0533115',
    email: 'ahmet@gmail.com'
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const passengerDeletedResponse = await request.delete(`/passengers/${passengerCreatedResponse.body._id}`).expect(200)

  expect(passengerDeletedResponse.text).toEqual('OK')

  done()
})

test('patches a passenger information (with parameters)', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0533115',
    email: 'ahmet@gmail.com'
  }

  const passengerToPatch = {
    name: 'Ahmet Tınastepe',
    phone: '0505110',
    email: 'ahmttnstpe@gmail.com'
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  await request.patch(`/passengers/${passengerCreatedResponse.body._id}`).send(passengerToPatch).expect(200)
  const passengerPatchedResponse = await request.get(`/passengers/${passengerCreatedResponse.body._id}`).expect(200)

  expect(passengerPatchedResponse.body).toMatchObject(passengerToPatch)

  done()
})

test('patches a passenger information (without parameters)', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0533115',
    email: 'ahmet@gmail.com'
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  await request.patch(`/passengers/${passengerCreatedResponse.body._id}`).send({}).expect(200)
  const passengerPatchedResponse = await request.get(`/passengers/${passengerCreatedResponse.body._id}`).expect(200)

  expect(passengerPatchedResponse.body).toMatchObject(passengerCreatedResponse.body)

  done()
})
