const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

require('./mongo-connection')

const app = express()

app.use(bodyParser.json())
app.use(cors())

app.set('view engine', 'pug')

require('./routes/routers')(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  console.log(err)

  res.status(err.status || 500)
  res.send(req.app.get('env') === 'development' ? {stack: err.stack, message: err.message} : {message: err.message})
})

module.exports = app
