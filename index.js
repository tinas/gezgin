const colors = require('colors')

const Passenger = require('./passenger')
const Station = require('./station')
const Bike = require('./bike')
const { StationType } = require('./enums')

const stations = []

function printStations() {
  stations.forEach((station) => {
    console.log(
      `${colors.cyan(station.name)} is a ${colors.magenta(
        station.stationType
      )} station`
    )
  })
}

const kadikoyBikeStation = new Station('Kadıköy', [0, 0], StationType.BIKE)
const tuzlaBikeStation = new Station('Tuzla', [2, 0], StationType.BIKE)
const pendikScooterStation = new Station('Pendik', [2, 4], StationType.SCOOTER)

stations.push(kadikoyBikeStation)
stations.push(tuzlaBikeStation)
stations.push(pendikScooterStation)

const ahmet = new Passenger('Ahmet Tinastepe', '505110', 'ahmttnstpe@gmail.com')
const bike = new Bike(0.1, 'Giant', kadikoyBikeStation)

ahmet.book(bike)
ahmet.printCurrentBooking()
console.log('------------')

ahmet.finishedBooking(tuzlaBikeStation)
bike.updateLastStation(tuzlaBikeStation)

ahmet.printBookingHistory()
console.log('------------')
printStations()
