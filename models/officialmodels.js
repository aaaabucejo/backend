//firstname, lastname,address,email,contact,age
const mongoose = require('mongoose')

const signUpOfficials = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    passWord:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    age:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('officials', signUpOfficials)