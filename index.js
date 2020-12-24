const {passengerDatabase, stationDatabase, scooterDatabase} = require('./database')
const {printCurrentBooking} = require('./lib/print-booking-history')
const {printStations} = require('./lib/print-station')

const mehmet = passengerDatabase.findByName('Mehmet')
const scooter = scooterDatabase.findByBrand('Razor E300')

mehmet.book(scooter)
passengerDatabase.update(mehmet)

printCurrentBooking(mehmet)

console.log('------------')

const stations = stationDatabase.load()

printStations(stations)
