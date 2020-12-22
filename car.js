class Car {
  constructor(pricePerMinute, brand, model) {
    this.pricePerMinute = pricePerMinute
    this.brand = brand
    this.model = model
  }

  updateLastStation(station) {
    this.lastStation = station
  }
}

module.export = Car
