const BaseService = require('./base-service')
const Station = require('../models/station')

class StationService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }

  async findByLocation(location) {
    return this.findBy('location', location)
  }
}

module.exports = new StationService(Station)
