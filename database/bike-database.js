const BaseDatabase = require('./base-database')
const Bike = require('../models/bike')

class BikeDatabase extends BaseDatabase {}

module.exports = new BikeDatabase(Bike)
