const app = require('../..')
const request = require('supertest')(app)

test('creates a new booking', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0505110',
    email: 'ahmet@gmail.com'
  }

  const scooterToCreate = {
    code: '101122',
    brand: 'Giant',
    pricePerMinute: 1
  }

  const originStationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const scooterCreatedResponse = await request.post('/scooters').send(scooterToCreate).expect(200)
  const originStationCreatedResponse = await request.post('/stations').send(originStationToCreate).expect(200)
  const bookingResponse = await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/current-booking`)
    .send({
      originId: originStationCreatedResponse.body._id,
      vehicleId: scooterCreatedResponse.body._id,
      vehicleType: 'Scooter'
    })
    .expect(200)

  expect(bookingResponse.body).toMatchObject({
    passenger: passengerCreatedResponse.body,
    origin: originStationCreatedResponse.body,
    vehicle: scooterCreatedResponse.body,
    vehicleType: 'Scooter',
    state: 0
  })

  done()
})

test('ends the current booking', async done => {
  const passengerToCreate = {
    name: 'Ahmet',
    phone: '0505110',
    email: 'ahmet@gmail.com'
  }

  const carToCreate = {
    code: '101122',
    brand: 'Giant',
    pricePerMinute: 1
  }

  const originStationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const destinationStationToCreate = {
    name: 'Maltepe',
    location: ['22.56', '65.78']
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const carCreatedResponse = await request.post('/cars').send(carToCreate).expect(200)
  const originStationCreatedResponse = await request.post('/stations').send(originStationToCreate).expect(200)
  const destinationStationCreatedResponse = await request.post('/stations').send(destinationStationToCreate).expect(200)

  await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/current-booking`)
    .send({
      originId: originStationCreatedResponse.body._id,
      vehicleId: carCreatedResponse.body._id,
      vehicleType: 'Car'
    })
    .expect(200)

  const finishBookingResponse = await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/bookings`)
    .send({destinationId: destinationStationCreatedResponse.body._id})
    .expect(200)

  expect(finishBookingResponse.body).toMatchObject({
    passenger: passengerCreatedResponse.body,
    origin: originStationCreatedResponse.body,
    destination: destinationStationCreatedResponse.body,
    vehicle: carCreatedResponse.body,
    vehicleType: 'Car',
    state: 1
  })

  done()
})
