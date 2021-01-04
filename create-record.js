const Passenger = require('./models/passenger')
const Station = require('./models/station')
const Bike = require('./models/bike')
const Scooter = require('./models/scooter')

const {passengerDatabase, stationDatabase, bikeDatabase, scooterDatabase} = require('./database')
const {printCurrentBooking, printBookingHistory} = require('./lib/print-booking')

const ahmet = Passenger.create({name: 'Ahmet', phone: '0505110', email: 'ahmttnstpe@gmail.com'})
const gamze = Passenger.create({name: 'Gamze', phone: '0505222', email: 'gamze@gmail.com'})

const kadikoyStation = Station.create({name: 'Kadıköy', location: [0, 0], bikeCapacity: 5})
const tuzlaStation = Station.create({name: 'Tuzla', location: [2, 0], bikeCapacity: 10, scooterCapacity: 4})
const pendikStation = Station.create({name: 'Pendik', location: [2, 4], scooterCapacity: 10})

const bike = Bike.create({pricePerMinute: 0.1, brand: 'Giant', lastStation: kadikoyStation})
const scooter = Scooter.create({pricePerMinute: 0.3, brand: 'Razor E300', lastStation: tuzlaStation})

async function main() {
  try {
    await stationDatabase.save([kadikoyStation, tuzlaStation, pendikStation])

    await bikeDatabase.save([bike])
    await scooterDatabase.save([scooter])

    ahmet.book(bike)
    ahmet.finishedBooking(tuzlaStation)
    bike.updateLastStation(tuzlaStation)

    ahmet.book(scooter)
    ahmet.finishedBooking(pendikStation)
    scooter.updateLastStation(pendikStation)

    gamze.book(scooter)
    gamze.finishedBooking(tuzlaStation)
    scooter.updateLastStation(tuzlaStation)

    await passengerDatabase.save([ahmet, gamze])

    const mehmet = Passenger.create({name: 'Mehmet', phone: '0545910', email: 'mehmet@gmail.com'})

    mehmet.book(bike)
    printCurrentBooking(mehmet)

    await passengerDatabase.insert(mehmet)

    const passengers = await passengerDatabase.load()
    passengers.forEach(printBookingHistory)
  } catch (e) {
    return console.log(e)
  }
}

main()
