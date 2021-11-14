const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlayerSchema = new Schema({
    name: String,
    age: Number,
    country: String,
    jumps: Array
});


const playerModel = mongoose.model('players', PlayerSchema);


module.exports = {
    playerModel
}
