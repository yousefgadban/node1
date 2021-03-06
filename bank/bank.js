const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())






/////////////////////////////////////////// ROUTES //////////////////////////////////////////////

const bankRouter = require('./bank-route')
app.use('/api/bank', bankRouter)

const usersRouter = require('./users/users-route')
app.use('/api/users', usersRouter)


console.log('bank');

mongoose.connect('mongodb+srv://yousef:qAkXwPk2DVscUk7h@cluster0.szbva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB ');
});
app.listen(process.env.PORT || 4000)