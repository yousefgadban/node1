const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const actionSchema = new Schema({
    userID: {
        type: String,
        required: true
    },
    actions: {
        type: Array
    }

});


const actionModel = mongoose.model('actions', actionSchema);


module.exports = {
    actionModel
}
