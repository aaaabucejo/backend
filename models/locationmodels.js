const mongoose = require('mongoose')

const signUpLocation = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type:String,
        required:true
    },
    latitude:{
        type:Number,
        required:true
    },
    longtitude:{
        type:Number,
        required:true
    },
    totalevac:{
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
    flood:{
        type:String,
        required: true
    },
    groundrupture:{
        type:String,
        required:true
    },
})

module.exports = mongoose.model('location', signUpLocation)