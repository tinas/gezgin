const Passenger = require('./models/passenger')
const Station = require('./models/station')
const Bike = require('./models/bike')
const Scooter = require('./models/scooter')

const {passengerDatabase, stationDatabase, bikeDatabase, scooterDatabase} = require('./database')
const {printCurrentBooking, printBookingHistory} = require('./lib/print-booking-history')

const kadikoyStation = Station.create({name: 'Kadıköy', location: [0, 0], bikeCapacity: 5})
const tuzlaStation = Station.create({name: 'Tuzla', location: [2, 0], bikeCapacity: 10, scooterCapacity: 4})
const pendikStation = Station.create({name: 'Pendik', location: [2, 4], scooterCapacity: 10})

stationDatabase.save([kadikoyStation, tuzlaStation, pendikStation])

const bike = Bike.create({pricePerMinute: 0.1, brand: 'Giant', lastStation: kadikoyStation})

bikeDatabase.save([bike])

const scooter = Scooter.create({pricePerMinute: 0.3, brand: 'Razor E300', lastStation: tuzlaStation})

scooterDatabase.save([scooter])

const ahmet = Passenger.create({name: 'Ahmet', phone: '0505110', email: 'ahmttnstpe@gmail.com'})
const gamze = Passenger.create({name: 'Gamze', phone: '0505222', email: 'gamze@gmail.com'})

ahmet.book(bike)
ahmet.finishedBooking(tuzlaStation)
bike.updateLastStation(tuzlaStation)

ahmet.book(scooter)
ahmet.finishedBooking(pendikStation)
scooter.updateLastStation(pendikStation)

gamze.book(scooter)
gamze.finishedBooking(tuzlaStation)
scooter.updateLastStation(tuzlaStation)

passengerDatabase.save([ahmet, gamze])

const mehmet = Passenger.create({name: 'Mehmet', phone: '0545910', email: 'mehmet@gmail.com'})

mehmet.book(bike)
printCurrentBooking(mehmet)

passengerDatabase.insert(mehmet)

const passengers = passengerDatabase.load()

console.log('------------------------')

passengers.forEach(printBookingHistory)
