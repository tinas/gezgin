const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema({
  passenger: {type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', autopopulate: {maxDepth: 1}},
  origin: {type: mongoose.Schema.Types.ObjectId, ref: 'Station', autopopulate: {maxDepth: 1}},
  destination: {type: mongoose.Schema.Types.ObjectId, ref: 'Station', autopopulate: {maxDepth: 1}},
  vehicle: {type: mongoose.Schema.Types.ObjectId, refPath: 'vehicleType', autopopulate: true},
  vehicleType: {type: String, required: true, enum: ['Bike', 'Scooter', 'Car']},
  state: {type: Number, required: true}
})
  {timestamps: true}

BookingSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Booking', BookingSchema)
