const mongoose = require('mongoose')

const signUpRoom = new mongoose.Schema({
    roomName:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    totalcap:{
        type:String,
    },
    capacity:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('room', signUpRoom)