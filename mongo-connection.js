const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/gezgin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('we are connected to mongodb!')
})
