const mongoose = require('mongoose');
const { boolean } = require('yargs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    avatar: {
        type: String
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
});


const userModel = mongoose.model('bank', userSchema);


module.exports = {
    userModel
}
