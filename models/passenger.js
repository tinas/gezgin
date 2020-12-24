const uuid = require('uuid')

const Booking = require('./booking')
const {BookingState} = require('../lib/enums')

class Passenger {
  constructor(id = uuid.v4(), name, phone, email, bookings = [], currentBooking = null) {
    this.id = id

    this.name = name
    this.phone = phone
    this.email = email
    this.bookings = bookings
    this.currentBooking = currentBooking
  }

  book(vehicle) {
    this.currentBooking = new Booking(vehicle, this, vehicle.lastStation, null, BookingState.IN_PROGRESS)

    return this.currentBooking
  }

  finishedBooking(destination) {
    this.currentBooking.destination = destination
    this.currentBooking.status = BookingState.FINISHED

    this.bookings.push(this.currentBooking)

    this.currentBooking = null
  }

  cancelBooking() {
    this.currentBooking.status = BookingState.CANCELLED

    this.bookings.push(this.currentBooking)
  }

  static create({id, name, phone, email, bookings, currentBooking}) {
    return new Passenger(id, name, phone, email, bookings, currentBooking)
  }
}

module.exports = Passenger
