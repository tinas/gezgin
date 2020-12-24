const uuid = require('uuid')

class Car {
  constructor(id = uuid.v4(), pricePerMinute, brand, model, lastStation) {
    this.id = id

    this.pricePerMinute = pricePerMinute
    this.brand = brand
    this.model = model
    this.lastStation = lastStation
  }

  updateLastStation(station) {
    this.lastStation = station
  }

  static create({id, pricePerMinute, brand, model, lastStation}) {
    return new Car(id, pricePerMinute, brand, model, lastStation)
  }
}

module.export = Car
