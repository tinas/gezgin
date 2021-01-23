const bikeService = require('./bike-service')
const scooterService = require('./scooter-service')
const carService = require('./car-service')

module.exports = {
  async findByIdAndType(vehicleId, vehicleType) {
    let vehicle = null

    switch (vehicleType) {
      case 'Bike':
        vehicle = await bikeService.find(vehicleId)
        break
      case 'Scooter':
        vehicle = await scooterService.find(vehicleId)
        break
      case 'Car':
        vehicle = await carService.find(vehicleId)
        break
    }

    return vehicle
  }
}
