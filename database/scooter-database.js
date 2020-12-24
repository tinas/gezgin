const BaseDatabase = require('./base-database')
const Scooter = require('../models/scooter')

class ScooterDatabase extends BaseDatabase {
  findByBrand(brand) {
    return this.findBy('brand', brand)
  }
}

module.exports = new ScooterDatabase(Scooter)
