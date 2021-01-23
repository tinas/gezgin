const ParkingUnit = require('../models/parking-unit')
const BaseService = require('./base-service')
const vehicleService = require('./vehicle-service')
const stationService = require('./station-service')

const State = {
  AVAILABLE: 0,
  UNAVAILABLE: 1,
  DEFECTIVE: 2
}

Object.freeze(State)

class ParkingUnitService extends BaseService {
  async insertToStation(code, state, stationId, vehicleId, vehicleType) {
    const station = await stationService.find(stationId)
    const vehicle = await vehicleService.findByIdAndType(vehicleId, vehicleType)

    const parkingUnit = await this.insert({code, state, station, vehicle, vehicleType})
    station.parkingUnits.push(parkingUnit)

    await station.save()

    return parkingUnit
  }

  async updateVehicle(parkingUnitId, vehicleId, vehicleType) {
    let vehicle = null
    let state = State.UNAVAILABLE

    if (vehicleId != null) {
      vehicle = await vehicleService.findByIdAndType(vehicleId, vehicleType)
      state = State.AVAILABLE
    }

    const parkingUnit = await this.update(parkingUnitId, {vehicle, state})

    return parkingUnit
  }
}

module.exports = new ParkingUnitService(ParkingUnit)
