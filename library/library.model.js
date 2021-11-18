const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    lang: {
        type: String,
        required: true,
        validate: {
            validator: (str) => str.length === 2,
            message: "Language must contain only 2 letters"
        }
    },
    rating: {
        type: Number,
        required: false,
        default: 1
    },
});


const bookModel = mongoose.model('books', BookSchema);


module.exports = {
    bookModel
}
