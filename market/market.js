const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()

const marketController = require('./marketController.js') 

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())


app.get('/', (req, res) => {
    console.log('market');
    res.send('market')
});

app.get('/getAllItems', (req, res) => {
    console.log('market');
    marketController.getAllItems().then((data) => {
        res.send(data)
    })
});

app.post('/addItem', (req, res) => {

    console.log('addItem', req.body.name, req.body.price);
    marketController.createItem(req.body.name, req.body.price).then((data) => {

        console.log('createItem', data);
        res.status(201).json(data)
    }).catch((e) => {
        console.log(e);
        res.status(200).json(e)
    })

})


app.listen(4000)


