const express = require('express')
const bodyParser = require('body-parser')

require('./mongo-connection')

const app = express()
app.use(bodyParser.json())

app.set('view engine', 'pug')

require('./routes/routers')(app)

app.listen(3000, () => {
  console.log('app listening on 3000')
})
