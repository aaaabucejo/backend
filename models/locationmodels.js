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
<<<<<<< HEAD
        type:Array,
        default:[]
=======
        type:String,
        required:true
>>>>>>> 4bfcb9768b26898aa44f4fd1145fbd9d92973b74
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