const mongoose = require('mongoose')

const ScooterSchema = new mongoose.Schema({
  code: {type: String, required: true, maxlength: 6},
  brand: {type: String, required: true},
  pricePerMinute: {type: Number, required: true, min: 0}
})

module.exports = mongoose.model('Scooter', ScooterSchema)
