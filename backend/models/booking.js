const mongoose = require('mongoose')

const BookingSchema = new mongoose.Schema(
  {
    passenger: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Passenger'
    },
    origin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      autopopulate: {maxDepth: 1}
    },
    destination: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Station',
      autopopulate: {maxDepth: 1}
    },
    parkingUnit: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'ParkingUnit',
      autopopulate: {maxDepth: 1}
    },
    totalPrice: {
      type: Number
    },
    state: {
      type: Number,
      required: true
    }
  },
  {timestamps: true}
)

BookingSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Booking', BookingSchema)
