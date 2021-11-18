const express = require('express')
const router = express.Router()
const bookModel = require('./library.model').bookModel;
const libraryController = require('./library.controller');

module.exports = router

 

router.get('/test', (req, res) => {
    libraryController.testfun(req, res);
})


router.get('/getAllBooks', (req, res) => {
    libraryController.getAllBooks(req, res);
})

router.get('/getBook/:id', (req, res) => {
    libraryController.getBook(req, res);
})

router.post('/createBook', (req, res) => {
    libraryController.addNewBook(req, res);
})

router.put('/updateBook/:id', (req, res) => {
    libraryController.updateBook(req, res);
})

router.delete('/deleteBook/:id', (req, res) => {
    libraryController.deleteBook(req, res);
});


