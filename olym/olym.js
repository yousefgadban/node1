const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())


const mongoose = require('mongoose');


/////////////////////////////////////////// ROUTES //////////////////////////////////////////////


const olymRouter = require('./olym-route.js')
app.use('/api/olym', olymRouter);



mongoose.connect('mongodb+srv://yousef:qAkXwPk2DVscUk7h@cluster0.szbva.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB ');
});
app.listen(process.env.PORT ||4000)