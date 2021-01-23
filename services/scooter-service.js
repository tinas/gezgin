const BaseService = require('./base-service')
const Scooter = require('../models/scooter')

class ScooterService extends BaseService {}

module.exports = new ScooterService(Scooter)
