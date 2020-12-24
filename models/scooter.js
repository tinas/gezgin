const uuid = require('uuid')

class Scooter {
  constructor(id = uuid.v4(), pricePerMinute, brand, lastStation) {
    this.id = id

    this.pricePerMinute = pricePerMinute
    this.brand = brand
    this.lastStation = lastStation
  }

  updateLastStation(station) {
    this.lastStation = station
  }

  static create({id, pricePerMinute, brand, lastStation}) {
    return new Scooter(id, pricePerMinute, brand, lastStation)
  }
}

module.exports = Scooter
