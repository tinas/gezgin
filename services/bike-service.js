const BaseService = require('./base-service')
const Bike = require('../models/bike')

class BikeService extends BaseService {}

module.exports = new BikeService(Bike)
