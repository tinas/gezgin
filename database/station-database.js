const BaseDatabase = require('./base-database')
const Station = require('../models/station')

class StationDatabase extends BaseDatabase {
  findByName(name) {
    return objects.findBy('name', name)
  }
}

module.exports = new StationDatabase(Station)
