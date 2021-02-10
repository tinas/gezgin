const BaseService = require('./base-service')
const Station = require('../models/station')

class StationService extends BaseService {
  async findByName(name) {
    return this.findBy('name', name)
  }
}

module.exports = new StationService(Station)
