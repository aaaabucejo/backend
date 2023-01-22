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
        type:Array,
<<<<<<< HEAD
        default:[]
=======
        default:[],
        required:true
>>>>>>> a371c5b231546328a8a7290bc0afee8d286a9e89
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