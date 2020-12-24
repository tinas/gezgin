const uuid = require('uuid')

class Station {
  constructor(id = uuid.v4(), name, location, bikeCapacity = 0, scooterCapacity = 0, carCapacity = 0) {
    this.id = id

    this.name = name
    this.location = location
    this.bikeCapacity = bikeCapacity
    this.scooterCapacity = scooterCapacity
    this.carCapacity = carCapacity
  }

  static create({id, name, location, bikeCapacity, scooterCapacity, carCapacity}) {
    return new Station(id, name, location, bikeCapacity, scooterCapacity, carCapacity)
  }
}

module.exports = Station
