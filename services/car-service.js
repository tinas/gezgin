const BaseService = require('./base-service')
const Car = require('../models/car')

class CarService extends BaseService {}

module.exports = new CarService(Car)
