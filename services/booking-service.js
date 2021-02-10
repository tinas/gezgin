const Booking = require('../models/booking')
const BaseService = require('./base-service')
const vehicleService = require('./vehicle-service')
const passengerService = require('./passenger-service')
const stationService = require('./station-service')

const BookingState = {
  IN_PROGRESS: 0,
  FINISHED: 1,
  CANCELLED: 2
}

Object.freeze(BookingState)

class BookingService extends BaseService {
  async book(passengerId, originId, vehicleId, vehicleType) {
    const passenger = await passengerService.find(passengerId)
    const origin = await stationService.find(originId)
    const vehicle = await vehicleService.findByIdAndType(vehicleId, vehicleType)

    const booking = await this.insert({passenger, origin, vehicle, vehicleType, state: BookingState.IN_PROGRESS})
    passenger.currentBooking = booking

    await passenger.save()

    return booking
  }

  async finishBook(passengerId, destinationId) {
    const passenger = await passengerService.find(passengerId)
    const destination = await stationService.find(destinationId)

    const booking = passenger.currentBooking
    booking.destination = destination
    booking.state = BookingState.FINISHED

    passenger.bookings.push(booking)
    passenger.currentBooking = null

    await this.update(booking._id, {destination, state: BookingState.FINISHED})
    await passenger.save()

    return booking
  }
}

module.exports = new BookingService(Booking)
