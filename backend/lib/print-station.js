const colors = require('colors')

function printStation(station) {
  console.log(
    `${colors.cyan(station.name)} station location information: ${station.location} | ${colors.blue(
      'Capacities'
    )} => [ Bike: ${colors.green(station.bikeCapacity)}, Scooter: ${colors.green(
      station.scooterCapacity
    )}, Electric Car: ${colors.green(station.carCapacity)} ]`
  )
}

function printStations(stations) {
  stations.forEach(printStation)
}

module.exports = {printStation, printStations}
