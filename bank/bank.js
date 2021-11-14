const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())






/////////////////////////////////////////// ROUTES //////////////////////////////////////////////

const bankRouter = require('./bank-route')
app.use('/api/bank', bankRouter)

const usersRouter = require('./users/users-route')
app.use('/api/users', usersRouter)




app.listen(4000)