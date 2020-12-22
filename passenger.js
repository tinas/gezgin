const colors = require('colors')

const Booking = require('./booking')
const { BookingState } = require('./enums')

class Passenger {
  constructor(name, phone, email) {
    this.name = name
    this.phone = phone
    this.email = email
    this.creditCards = []
    this.bookings = []
    this.currentBooking
  }

  book(vehicle) {
    this.currentBooking = new Booking(
      vehicle,
      this,
      vehicle.lastStation,
      null,
      BookingState.IN_PROGRESS
    )

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

  printBooking(booking) {
    console.log(
      `${colors.yellow(booking.passenger.name)} went to ${colors.cyan(
        booking.destination.name
      )} from ${colors.cyan(booking.origin.name)} with ${colors.blue(
        booking.vehicle.brand
      )}`
    )
  }

  printCurrentBooking() {
    console.log(
      `${colors.yellow(this.name)} started a booking from ${colors.cyan(
        this.currentBooking.origin.name
      )} ${colors.magenta(this.currentBooking.origin.stationType)} station`
    )
  }

  printBookingHistory() {
    this.bookings.forEach(this.printBooking)
  }
}

module.exports = Passenger
