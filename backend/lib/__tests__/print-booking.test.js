const {printCurrentBooking, printBookingHistory} = require('../print-booking')

test('prints passenger booking when a passenger has a current booking', () => {
  const passenger = {
    name: 'Ahmet',
    currentBooking: {
      origin: {name: 'Kadıköy'},
      vehicle: {brand: 'Razor E300'}
    }
  }

  const consoleSpy = jest.spyOn(console, 'log')

  printCurrentBooking(passenger)

  expect(consoleSpy).toHaveBeenCalledWith('Ahmet launched booking with Razor E300 from Kadıköy station')

  consoleSpy.mockRestore()
})

test('prints warning message when a passenger has no current booking', () => {
  const passenger = {
    name: 'Ahmet',
    currentBooking: null
  }

  const consoleSpy = jest.spyOn(console, 'log')

  printCurrentBooking(passenger)

  expect(consoleSpy).toHaveBeenCalledWith('Ahmet has no current booking yet.')

  consoleSpy.mockRestore()
})

test('prints passenger bookings when a passenger has a booking', () => {
  const passenger = {
    name: 'Ahmet',
    bookings: [
      {
        passenger: {name: 'Ahmet'},
        origin: {name: 'Kadıköy'},
        destination: {name: 'Maltepe'},
        vehicle: {brand: 'Razor E300'}
      }
    ]
  }

  const consoleSpy = jest.spyOn(console, 'log')

  printBookingHistory(passenger)

  expect(consoleSpy).toHaveBeenCalledWith('Ahmet went to Maltepe from Kadıköy with Razor E300')

  consoleSpy.mockRestore()
})

test('prints warning message when a passenger has no bookings', () => {
  const passenger = {
    name: 'Ahmet',
    bookings: []
  }

  const consoleSpy = jest.spyOn(console, 'log')

  printBookingHistory(passenger)

  expect(consoleSpy).toHaveBeenCalledWith('Ahmet has no bookings yet.')

  consoleSpy.mockRestore()
})
