const mongoose = require('mongoose')

const ParkingUnitSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    maxlength: 6
  },
  state: {
    type: Number,
    required: true
  },
  station: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Station'
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'vehicleType',
    autopopulate: true
  },
  vehicleType: {
    type: String,
    required: true,
    enum: ['Bike', 'Scooter', 'Car']
  }
})

ParkingUnitSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('ParkingUnit', ParkingUnitSchema)
