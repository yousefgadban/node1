const cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express()
const mongoose = require('mongoose');

const studentsController = require('./studentsController');
const studentsModel = require('./student.model').studentsModel;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())


app.get('/', (req, res) => {
    console.log('students');
    res.send('students')
});

app.get('/getAllStudents', (req, res) => {
    studentsModel.find({}, (err, data) => {
        if (err) throw err;
        res.send(data);
    })
});

app.post('/createStudent', (req, res) => {
    console.log('req.params', req.body);
    const {name, age, email} = req.body;
    console.log('createStudent', name, age, email);

    const newStudent = new studentsModel({
        name: name,
        age: age,
        email: email
    });
    newStudent.save();
    res.send('student created');
});

app.delete('/deleteStudent/:id', (req, res) => {
    const {id} = req.params;
    console.log('deleteStudent', id);

    studentsModel.findByIdAndDelete(id, (err, data) => {
        if (err) throw err;
        if (data) {
            return res.status(200).json({success: data})
        }
        return res.status(400).json({error: 'Item not found'})

    })
});


app.put('/editStudent/:id', (req, res) => {
    const {id} = req.params;
    const {name, age, email} = req.body;
    console.log('editStudent', id, name, age, email);

    const query = {'_id': id};
    const updatedData = {name: name, age: age, email: email}
    
    studentsModel.findOneAndUpdate(query, updatedData, function(err, data) {
        if (err) return res.send(500, {error: err});
        return res.send({success: data});
    });

    //res.send('editStudent');
});



mongoose.connect('mongodb://localhost/studentsDB', {useNewUrlParser: true, useUnifiedTopology: true}, () => {
    console.log('Connected to DB');
});
app.listen(4000)