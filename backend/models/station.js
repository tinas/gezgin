const mongoose = require('mongoose')

const StationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  location: [{type: String}],
  parkingUnits: [{type: mongoose.Schema.Types.ObjectId, ref: 'ParkingUnit', autopopulate: {maxDepth: 2}}]
})

StationSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Station', StationSchema)
