const ParkingUnit = require('../models/parking-unit')
const BaseService = require('./base-service')
const stationService = require('./station-service')
const bikeService = require('./bike-service')
const scooterService = require('./scooter-service')
const carService = require('./car-service')

const State = {
  AVAILABLE: 0,
  UNAVAILABLE: 1,
  DEFECTIVE: 2
}

Object.freeze(State)

async function findVehicleByIdAndType(id, type) {
  switch (type) {
    case 'Bike':
      return bikeService.find(id)
    case 'Scooter':
      return scooterService.find(id)
    case 'Car':
      return carService.find(id)
    default:
      return null
  }
}

class ParkingUnitService extends BaseService {
  async insertToStation({code, stationId, vehicleId, vehicleType}) {
    const station = await stationService.find(stationId)
    let state = State.UNAVAILABLE
    let vehicle = null

    if (vehicleId != null) {
      vehicle = await findVehicleByIdAndType(vehicleId, vehicleType)
      state = State.AVAILABLE
    }

    const parkingUnit = await this.insert({code, state, station, vehicle, vehicleType})
    station.parkingUnits.push(parkingUnit)

    await station.save()

    return parkingUnit
  }

  async updateVehicle(parkingUnitId, vehicleId, vehicleType) {
    let vehicle = null
    let state = State.UNAVAILABLE

    if (vehicleId != null) {
      vehicle = await findVehicleByIdAndType(vehicleId, vehicleType)
      state = State.AVAILABLE
    }

    const parkingUnit = await this.update(parkingUnitId, {vehicle, state})

    return parkingUnit
  }
}

module.exports = new ParkingUnitService(ParkingUnit)
