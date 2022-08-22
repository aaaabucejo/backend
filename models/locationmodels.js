const mongoose = require('mongoose')

const signUpLocation = new mongoose.Schema({
    address:{
        type:String,
        required:true
    },
    capacity:{
        type:String,
        required:true
    },
    room:{
        type:String,
        required:true
    },
    restroom:{
        type:String,
        required:true
    },
    kitchen:{
        type:String,
        required:true
    },
    evehicle:{
        type:String,
        required:true
    },
    firstaid:{
        type:String,
        required: true
    },
    official:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('location', signUpLocation)