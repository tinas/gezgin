class Scooter {
  constructor(pricePerMinute, brand, lastStation) {
    this.pricePerMinute = pricePerMinute
    this.brand = brand
    this.lastStation = lastStation
  }

  updateLastStation(station) {
    this.lastStation = station
  }
}

module.exports = Scooter
