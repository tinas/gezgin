const colors = require('colors')

function printBooking(booking) {
  console.log(
    `${colors.yellow(booking.passenger.name)} went to ${colors.cyan(booking.destination.name)} from ${colors.cyan(
      booking.origin.name
    )} with ${colors.blue(booking.vehicle.brand)}`
  )
}

function printCurrentBooking(passenger) {
  if (passenger.currentBooking == null)
    return console.log(`${colors.yellow(passenger.name)} has no current booking yet.`)

  console.log(
    `${colors.yellow(passenger.name)} launched booking with ${colors.blue(
      passenger.currentBooking.vehicle.brand
    )} from ${colors.cyan(passenger.currentBooking.origin.name)} station`
  )
}

function printBookingHistory(passenger) {
  if (passenger.bookings.length == 0) return console.log(`${colors.yellow(passenger.name)} has no bookings yet.`)

  passenger.bookings.forEach(printBooking)
}

module.exports = {printCurrentBooking, printBookingHistory}
