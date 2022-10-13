const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/models')
const signUpLocation = require('../models/locationmodels')
const officialsTemplate = require('../models/officialmodels')
const { request } = require('express')
const { updateOne } = require('../models/models')
// const { Navigate } = require('react-router-dom')
const jwt = require('jsonwebtoken')


// sign up data
router.post('/signup', (request, response) => {
    const signUpUser = new signUpTemplateCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        contactNo: request.body.contactNo,
        siteT: request.body.siteT,
        status: request.body.status,
        username: request.body.username,
        password: request.body.password
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
        address: request.body.address,
        latitude: request.body.latitude,
        longtitude: request.body.longtitude,
        capacity: request.body.capacity,
        room: request.body.room,
        restroom: request.body.restroom,
        kitchen: request.body.kitchen,
        firstaid: request.body.firstaid,
        description: request.body.description
    })
    signUpLoc.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)

        })
})

//sign up ng officials data
router.post('/signupofficials', async (request, response) => {
    const signUpOff = new officialsTemplate({
        userName: request.body.userName,
        passWord: request.body.passWord,
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        address: request.body.address,
        email: request.body.email,
        contact: request.body.contact,
        age: request.body.age
    })
    signUpOff.save()
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

                // response.send('Login Succesful')
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

//delete data ng resident
router.post('/deleteresident', async (request, response) => {

    signUpTemplateCopy.findOneAndDelete({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
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
        address: request.body.address,
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
        email: request.body.email,
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
        siteT: request.body.siteT,
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
        address: request.body.address,
    }, {
        capacity: request.body.capacity,
        room: request.body.room,
        restroom: request.body.restroom,
        kitchen: request.body.kitchen,
        firstaid: request.body.firstaid,
        description: request.body.description
    }, function (err) {

        if (err) {
            response.send('Updating Document failed');
        } else {
            response.send('Document Updated Successfully');
        }
    })
})
module.exports = router