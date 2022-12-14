//Team name: Bing Bong
const mongoose = require('mongoose')

const signUpTemplate = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contactNo:{
        type:String,
        required:true
    },
    dateAdmitted:{
        type:Date,
        default:Date.now
    },
    siteT:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
        required:true
    },
    longtitude:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    status:{
        type: String,
        required: true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model('evacuee', signUpTemplate)