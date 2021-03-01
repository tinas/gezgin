const mongoose = require('mongoose')
const seedDatase = require('./lib/seedDatabase')

mongoose.connect('mongodb://localhost/gezgin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', async () => {
  console.log('we are connected to mongodb!')
  await seedDatase()
})
