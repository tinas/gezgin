const {passengerDatabase, stationDatabase, scooterDatabase} = require('./database')
const {printCurrentBooking, printBookingHistory} = require('./lib/print-booking')
const {printStations} = require('./lib/print-station')

async function main() {
  try {
    const mehmet = await passengerDatabase.findByName('Mehmet')
    const scooter = await scooterDatabase.findByBrand('Razor E300')

    mehmet.book(scooter)

    await passengerDatabase.update(mehmet)

    printCurrentBooking(mehmet)

    const passengers = await passengerDatabase.load()
    const stations = await stationDatabase.load()

    passengers.forEach(printBookingHistory)
    console.log('------------------------')
    printStations(stations)
  } catch (e) {
    return console.log(e)
  }
}

main()
