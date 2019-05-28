const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
    id : String,
    usuario : String,
    password : String,
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