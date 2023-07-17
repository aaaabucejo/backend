const mongoose = require('mongoose')

const signUpBarangay = new mongoose.Schema({
    barangayName:{
        type:String,
        required:true
    },
    latitude:{
        type:String,
       
    },
    longitude:{
        type:String,
    }
 
})

module.exports = mongoose.model('barangay', signUpBarangay)