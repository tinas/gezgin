const {printStation, printStations} = require('../print-station')

test('prints the information of a single station', () => {
  const station = {
    name: 'Maltepe',
    location: [10, 20],
    bikeCapacity: 5,
    scooterCapacity: 2,
    carCapacity: 0
  }

  const consoleSpy = jest.spyOn(console, 'log')

  printStation(station)

  expect(consoleSpy).toHaveBeenCalledWith(
    'Maltepe station location information: 10,20 | Capacities => [ Bike: 5, Scooter: 2, Electric Car: 0 ]'
  )

  consoleSpy.mockRestore()
})

test('prints stations information', () => {
  const stations = [
    {
      name: 'Maltepe',
      location: [11.25, 45.64],
      bikeCapacity: 20,
      scooterCapacity: 6,
      carCapacity: 3
    }
  ]

  const consoleSpy = jest.spyOn(console, 'log')

  printStations(stations)

  expect(consoleSpy).toHaveBeenCalledWith(
    'Maltepe station location information: 11.25,45.64 | Capacities => [ Bike: 20, Scooter: 6, Electric Car: 3 ]'
  )

  consoleSpy.mockRestore()
})
