const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/models')
const signUpLocation = require('../models/locationmodels')
const officialsTemplate = require('../models/officialmodels')
const signUpRoom = require('../models/roommodels')
const signUpHotline = require('../models/hotlinemodels')
const { request, response } = require('express')
const { updateOne } = require('../models/models')
// const { Navigate } = require('react-router-dom')
const jwt = require('jsonwebtoken')

// const emails= require('../services/Email')



// sign up data
router.post('/signup', (request, response) => {
    const signUpUser = new signUpTemplateCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        contactNo: request.body.contactNo,
        name: request.body.name,
        address: request.body.address,
        latitude:request.body.latitude,
        longtitude:request.body.longtitude,
        age: request.body.age,
        status: request.body.status,
        username: request.body.username,
        password: request.body.password,
        roomName: request.body.roomName,
        inoutStatus:request.body.inoutStatus
    })
    signUpUser.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

//sign up ng location data
router.post('/signuplocation', async (request, response) => {
    const signUpLoc = new signUpLocation({
        name: request.body.name,
        address: request.body.address,
        latitude: request.body.latitude,
        longtitude: request.body.longtitude,
        totalevac: request.body.totalevac,
        capacity: request.body.capacity,
        room: request.body.room,
        restroom: request.body.restroom,
        kitchen: request.body.kitchen,
        flood: request.body.flood,
        groundrupture: request.body.groundrupture
    })
    signUpLoc.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)

        })
})
//signup officials
router.post('/signupofficials', async (request, response) => {
    const signUpOff = new officialsTemplate({
        email: request.body.email,
        passWord: request.body.passWord,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        contact: request.body.contact,
        age: request.body.age
    })
    // const emailToken = jwt.sign({
    //     email: request.body.email
    // },'secret1234',{expiresIn: '1hr'})
    // emails.verifyUserEmail(request.body.firstName,request.body.lastName,request.body.email,emailToken)
    signUpOff.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
            
        

        })
})

//signup room
router.post('/signupRoom', (request, response) => {
    const signUpR = new signUpRoom({
        roomName:request.body.roomName,
        name:request.body.name,
        totalcap:request.body.totalcap,
        capacity:request.body.capacity
    })
    signUpR.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)
        })
})

router.post('/signuphotline', async (request, response) => {
    const signUpHot = new signUpHotline({
        agency:request.body.agency,
        directline:request.body.directline,
        area:request.body.area
    })
    signUpHot.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)

        })
})

var token;

router.post('/signin', async (request, response) => {
    officialsTemplate.find({
        email: request.body.email,
        passWord: request.body.passWord
    }
        , async (err, documents) => {
            if (err) {
                response.send('error')
            }
            else {
                if (documents == 0) {
                    return response.json({ status: 'incorrect username or password', officialsTemplate: false })

                } else {
                 token = jwt.sign({
                        officialsTemplate: request.body.firstName,
                        officialsTemplate: request.body.email
                    }, 'secret')
                    return response.json({ status: 'Login Successful', officialsTemplate: true, token: token })
                    
                }
            }
        })
})
//get data output to table(resident)
router.post('/getUsers', async (request, response) => {

    signUpTemplateCopy.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})
//get data output to table(sites)
router.post('/getlocation', async (request, response) => {

    signUpLocation.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})
//get data output to table(officials)
router.post('/getofficials', async (request, response) => {

    officialsTemplate.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})

router.post('/gethotline', async (request, response) => {

    signUpHotline.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})

//get data output to table(rooms)
router.post('/getRooms', async (request, response) => {

    signUpRoom.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})

//delete room
router.post('/deleteroom', async (request, response) => {

    signUpRoom.findOneAndDelete({
        id:request.body.id
        
    }, async (error, document) => {
        if (error) {
            response.send("error", err)
        }
        else {
            response.send(document)
            console.log('deleted')
        }
    })
})

//delete data ng resident
router.post('/deleteresident', async (request, response) => {

    signUpTemplateCopy.findOneAndDelete({
       _id:request.body._id,
       firstName:request.body.firstName,
       lastName:request.body.lastName
    }, async (error, document) => {
        if (error) {
            response.send("error", err)
        }
        else {
            response.send(document)
            console.log('deleted')
        }
    })
})
//delete location
router.post('/deletelocation', async (request, response) => {

    signUpLocation.findOneAndDelete({
        id:request.body.id,
        name:request.body.name,
        address:request.body.address
    }, async (error, document) => {
        if (error) {
            response.send("error", err)
        }
        else {
            response.send(document)
            console.log('deleted')
        }
    })
})
//delete officials
router.post('/deleteofficials', async (request, response) => {

    officialsTemplate.findOneAndDelete({
        id:request.body.id,
        email:request.body.email
    }, async (error, document) => {
        if (error) {
            response.send("error", err)
        }
        else {
            response.send(document)
            console.log('deleted')
        }
    })
})

router.post('/deletehotline', async (request, response) => {

    signUpHotline.findOneAndDelete({
        id:request.body.id,
        directline:request.body.directline,
    }, async (error, document) => {
        if (error) {
            response.send("error", err)
        }
        else {
            response.send(document)
            console.log('deleted')
        }
    })
})


//update users
router.post('/updateUsers', (request, response) => {
    signUpTemplateCopy.findOneAndUpdate({
        firstName: request.body.firstName,

    }, {
        lastName: request.body.lastName,
        contactNo: request.body.contactNo,
        name: request.body.name,
        age: request.body.age
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})
//update location
router.post('/updateLocation', (request, response) => {
    signUpLocation.findOneAndUpdate({
        id: request.body.id,
        name: request.body.name,
    }, {
        
        address: request.body.address,
        restroom: request.body.restroom,
        kitchen: request.body.kitchen,
        flood: request.body.flood,
        groundrupture: request.body.groundrupture,
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})

router.post('/updatehotline', (request, response) => {
    signUpHotline.findOneAndUpdate({
        _id: request.body._id,
        

    }, {
        directline: request.body.directline,
        agency:request.body.agency,
        area:request.body.area
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})

router.post('/updateofficials', (request, response) => {
    officialsTemplate.findOneAndUpdate({
        _id:request.body._id,

    }, {
        firstName:request.body.firstName,
        lastName:request.body.lastName,
        contact:request.body.contact,
        email:request.body.email
       
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})
//change status to force
router.post('/updateStatus', (request, response) => {
    signUpTemplateCopy.updateMany({
        status:request.body.status
    },function(err){
        if(err){
            response.send('Update Docuent Failed')
        }else{
            response.send('Document Updated Successful')
        }
    })
})


router.post('/updateLocationTotal', (request, response) => {
    signUpLocation.findOneAndUpdate({
        name:request.body.name
    }, {
        totalevac:request.body.totalevac
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})

router.post('/updateRoomTotal', (request, response) => {
    signUpRoom.findOneAndUpdate({
        name:request.body.name,
        roomName:request.body.roomName
    }, {
        totalcap:request.body.totalcap
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})

router.post('/updateLocationCapacity', (request, response) => {
    signUpLocation.findOneAndUpdate({
        name:request.body.name
    }, {
        capacity:request.body.capacity
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})

router.post('/updateRoomCount', (request, response) => {
    signUpLocation.findOneAndUpdate({
        name:request.body.name
    }, {
        room:request.body.room
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})
//emailer

// router.post('/verifyEmailToken', async (request, response) =>{
//     signUpOfficial.findOne({
//         email: request.body.email
//     },function(err, result){
//         try{
//             const decode = jwt.verify(request.body.email.token, 'secret1234')
//             console.log(decode)
//             let f = signUpOfficial.updateOne({email: request.body.email},
//                 {
//                     $set:{
//                         confirmedEmail:true,
//                     }       
//                 }).then(console.log('User Found and Modified Email Token'));
//                 return response.json({ status: 'okay'});
//         }catch(err){
//             console.log(err)
//             return response.json({status:'error'})
//         }
//     })
// })


// router.post('/addevac',(request,response)=>{
    
// })


module.exports = router