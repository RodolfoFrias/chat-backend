const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id : String,
    email : {
        type: String,
        required: true
    },
    usuario : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    mensaje : {
        type : String,
        default : ''
    },
    status : {
        type: Boolean,
        default : true
    }
});

module.exports = mongoose.model('usuario',User);