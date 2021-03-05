const BaseService = require('./base-service')
const Passenger = require('../models/passenger')

class PassengerService extends BaseService {}

module.exports = new PassengerService(Passenger)
