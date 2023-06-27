const mongoose = require('mongoose')

const signUpHotline = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    agency:{
        type:String,
        required:true
    },
    directline:{
        type:String,
        required:true
    },
    area:{
        type:String,
    },
    
})

module.exports = mongoose.model('hotline', signUpHotline)