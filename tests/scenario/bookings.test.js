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
    brand: 'Razor E300',
    pricePerMinute: 0.75
  }

  const originStationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const scooterCreatedResponse = await request.post('/scooters').send(scooterToCreate).expect(200)
  const originStationCreatedResponse = await request.post('/stations').send(originStationToCreate).expect(200)

  const parkingUnitToCreate = {
    code: '967736',
    vehicleId: scooterCreatedResponse.body._id,
    vehicleType: 'Scooter'
  }

  const parkingUnitCreatedResponse = await request
    .post(`/stations/${originStationCreatedResponse.body._id}/parking-units`)
    .send(parkingUnitToCreate)
    .expect(200)

  const bookingResponse = await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/current-booking`)
    .send({
      parkingUnitId: parkingUnitCreatedResponse.body._id
    })
    .expect(200)

  expect(bookingResponse.body).toMatchObject({
    passenger: passengerCreatedResponse.body,
    state: 0
  })
  expect(bookingResponse.body.origin.parkingUnits).toHaveLength(1)
  expect(bookingResponse.body.origin.parkingUnits).toEqual(
    expect.arrayContaining([parkingUnitCreatedResponse.body._id])
  )
  expect(bookingResponse.body.parkingUnit.vehicle).toEqual(scooterCreatedResponse.body._id)
  expect(bookingResponse.body.parkingUnit.vehicleType).toEqual('Scooter')

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
    brand: 'Audi',
    pricePerMinute: 1.25
  }

  const originStationToCreate = {
    name: 'Kadıköy',
    location: ['10', '11.58']
  }

  const destinationStationToCreate = {
    name: 'Tuzla',
    location: ['22.56', '65.78']
  }

  const passengerCreatedResponse = await request.post('/passengers').send(passengerToCreate).expect(200)
  const carCreatedResponse = await request.post('/cars').send(carToCreate).expect(200)
  const originStationCreatedResponse = await request.post('/stations').send(originStationToCreate).expect(200)
  const destinationStationCreatedResponse = await request.post('/stations').send(destinationStationToCreate).expect(200)

  const parkingUnitToCreateWithVehicle = {
    code: '100230',
    vehicleId: carCreatedResponse.body._id,
    vehicleType: 'Car'
  }

  const parkingUnitToCreateWithoutVehicle = {
    code: '100230',
    vehicleType: 'Car'
  }

  const originParkingUnitCreatedResponse = await request
    .post(`/stations/${originStationCreatedResponse.body._id}/parking-units`)
    .send(parkingUnitToCreateWithVehicle)
    .expect(200)

  const destinationParkingUnitCreatedResponse = await request
    .post(`/stations/${destinationStationCreatedResponse.body._id}/parking-units`)
    .send(parkingUnitToCreateWithoutVehicle)
    .expect(200)

  await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/current-booking`)
    .send({
      parkingUnitId: originParkingUnitCreatedResponse.body._id
    })
    .expect(200)

  await request
    .patch(`/parking-units/${originParkingUnitCreatedResponse.body._id}`)
    .send({vehicleType: 'Car'})
    .expect(200)

  await request
    .patch(`/parking-units/${destinationParkingUnitCreatedResponse.body._id}`)
    .send({
      vehicleId: carCreatedResponse.body._id,
      vehicleType: 'Car'
    })
    .expect(200)

  const finishBookingResponse = await request
    .post(`/passengers/${passengerCreatedResponse.body._id}/bookings`)
    .send({destinationId: destinationStationCreatedResponse.body._id})
    .expect(200)

  expect(finishBookingResponse.body.passenger).toEqual(passengerCreatedResponse.body._id)
  expect(finishBookingResponse.body.state).toEqual(1)
  expect(finishBookingResponse.body.origin.parkingUnits).toHaveLength(1)
  expect(finishBookingResponse.body.origin.parkingUnits).toEqual(
    expect.arrayContaining([originParkingUnitCreatedResponse.body._id])
  )
  expect(finishBookingResponse.body.destination.parkingUnits).toHaveLength(1)
  expect(finishBookingResponse.body.destination.parkingUnits).toEqual(
    expect.arrayContaining([expect.objectContaining({_id: destinationParkingUnitCreatedResponse.body._id})])
  )

  done()
})
