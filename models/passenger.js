const mongoose = require('mongoose')

const PassengerSchema = new mongoose.Schema({
  name: {type: String, required: true, minlength: 2},
  phone: {type: String, required: true, $regex: /[0-9]/},
  email: {type: String, required: true},
  currentBooking: {type: mongoose.Schema.Types.ObjectId, ref: 'Booking', autopopulate: {maxDepth: 2}},
  bookings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Booking', autopopulate: {maxDepth: 2}}]
})

PassengerSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Passenger', PassengerSchema)
