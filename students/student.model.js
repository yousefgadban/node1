const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StudentSchema = new Schema({
    name: String,
    age: Number,
    email: String,
});


const studentsModel = mongoose.model('students', StudentSchema);


module.exports = {
    studentsModel
}
