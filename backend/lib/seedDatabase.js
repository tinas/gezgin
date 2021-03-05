const {bikeService, scooterService, carService, stationService, parkingUnitService} = require('../services/index')

module.exports = async function seedDatase() {
  const bikes = await bikeService.load()
  const scooters = await scooterService.load()
  const cars = await carService.load()
  const stations = await stationService.load()
  const parkingUnits = await parkingUnitService.load()

  if (bikes.length > 0 || scooters.length > 0 || cars.length > 0 || stations.length > 0 || parkingUnits.length > 0)
    return

  //vehicles
  const bikeToCreate = {
    code: '000001',
    brand: 'Giant',
    pricePerMinute: 0.25
  }
  const scooterToCreate = {
    code: '000002',
    brand: 'Razor E300',
    pricePerMinute: 0.5
  }
  const carToCreate = {
    code: '000003',
    brand: 'Audi A8',
    pricePerMinute: 1.25
  }

  await bikeService.insert(bikeToCreate)
  await scooterService.insert(scooterToCreate)
  await carService.insert(carToCreate)

  const bikeCreatedResponse = await bikeService.findBy('code', bikeToCreate.code)
  const scooterCreatedResponse = await scooterService.findBy('code', scooterToCreate.code)
  const carCreatedResponse = await carService.findBy('code', carToCreate.code)

  //stations
  const maltepeStationToCreate = {
    name: 'Maltepe',
    location: ['10.22', '11.58']
  }
  const tuzlaStationToCreate = {
    name: 'Tuzla',
    location: ['10.22', '11.58']
  }

  await stationService.insert(maltepeStationToCreate)
  await stationService.insert(tuzlaStationToCreate)

  const maltepeStationCreatedResponse = await stationService.findBy('name', maltepeStationToCreate.name)
  const tuzlaStationCreatedResponse = await stationService.findBy('name', tuzlaStationToCreate.name)

  // parking Units
  const maltepeBikeParkingUnitToCreate = {
    code: '101010',
    stationId: maltepeStationCreatedResponse[0]._id,
    vehicleId: bikeCreatedResponse[0]._id,
    vehicleType: 'Bike'
  }
  const maltepeScooterParkingUnitToCreate = {
    code: '202020',
    stationId: maltepeStationCreatedResponse[0]._id,
    vehicleId: scooterCreatedResponse[0]._id,
    vehicleType: 'Scooter'
  }
  const maltepeCarParkingUnitToCreate = {
    code: '303030',
    stationId: maltepeStationCreatedResponse[0]._id,
    vehicleId: carCreatedResponse[0]._id,
    vehicleType: 'Car'
  }
  const tuzlaBikeParkingUnitToCreate = {
    code: '111111',
    stationId: tuzlaStationCreatedResponse[0]._id,
    vehicleType: 'Bike'
  }
  const tuzlaScooterParkingUnitToCreate = {
    code: '222222',
    stationId: tuzlaStationCreatedResponse[0]._id,
    vehicleType: 'Scooter'
  }
  const tuzlaCarParkingUnitToCreate = {
    code: '333333',
    stationId: tuzlaStationCreatedResponse[0]._id,
    vehicleType: 'Car'
  }

  // Maltepe station parking units
  await parkingUnitService.insertToStation(maltepeBikeParkingUnitToCreate)
  await parkingUnitService.insertToStation(maltepeScooterParkingUnitToCreate)
  await parkingUnitService.insertToStation(maltepeCarParkingUnitToCreate)

  // Tuzla station parking units
  await parkingUnitService.insertToStation(tuzlaBikeParkingUnitToCreate)
  await parkingUnitService.insertToStation(tuzlaScooterParkingUnitToCreate)
  await parkingUnitService.insertToStation(tuzlaCarParkingUnitToCreate)
}
