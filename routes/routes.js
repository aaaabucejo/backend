const express = require('express')
const router = express.Router()
const signUpTemplateCopy = require('../models/models')
const signUpLocation = require('../models/locationmodels')
const officialsTemplate = require('../models/officialmodels')
const signUpRoom = require('../models/roommodels')
const signUpHotline = require('../models/hotlinemodels')
const signUpBarangay = require('../models/barangaymodels')
const { request, response } = require('express')
const { updateOne } = require('../models/models')
// const { Navigate } = require('react-router-dom')
const jwt = require('jsonwebtoken')

// const emails= require('../services/Email')



// sign up data
router.get('/signup', async (request, response) => {
    try {
        const signUpUser = new signUpTemplateCopy({
            firstName: request.query.firstName,
            lastName: request.query.lastName,
            contactNo: request.query.contactNo,
            barangayName: request.query.barangayName,
            name: request.query.name,
            address: request.query.address,
            latitude: request.query.latitude,
            longtitude: request.query.longtitude,
            age: request.query.age,
            status: request.query.status,
            username: request.query.username,
            password: request.query.password,
            roomName: request.query.roomName,
            inoutStatus: request.query.inoutStatus
        });

        const data = await signUpUser.save();

        const barangayDocument = await signUpBarangay.findOne({
            barangayName: data.barangayName
        }).exec();
        response.json({ message: "Sign up successful", data: data, barangayDocument: barangayDocument });
    } catch (error) {
        console.error("Error while signing up:", error);
        response.status(500).json({ error: "Error while signing up" });
    }
});

//sign up ng location data
router.get('/signuplocation', async (request, response) => {
    const signUpLoc = new signUpLocation({
        name: request.query.name,
        barangayName: request.query.barangayName,
        address: request.query.address,
        latitude: request.query.latitude,
        longtitude: request.query.longtitude,
        totalevac: request.query.totalevac,
        capacity: request.query.capacity,
        room: request.query.room,
        restroom: request.query.restroom,
        kitchen: request.query.kitchen,
        flood: request.query.flood,
        groundrupture: request.query.groundrupture
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
        image:request.body.image,
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

router.get('/signupBarangay', async (request, response) => {
    const signUpNewBarangay = new signUpBarangay({
        barangayName: request.query.barangayName,
        latitude: request.query.latitude,
        longitude: request.query.longitude
    })
    signUpNewBarangay.save()
        .then(data => {
            response.json(data)
        })
        .catch(error => {
            response.json(error)

        })
})


var token;

router.get('/signin', async (request, response) => {
    officialsTemplate.find({
        email: request.query.email,
        passWord: request.query.passWord
    }
        , async (err, documents) => {
            if (err) {
                response.send('error')
            }
            else {
                if (documents == 0) {
                    return response.json({ status: 'incorrect username or password', officialsTemplate: false })

                } else {
                    const document = documents[0];
                 token = jwt.sign({
                        officialsTemplate: request.body.firstName,
                        officialsTemplate: request.body.email
                    }, 'secret')
                    return response.json({ status: 'Login Successful', officialsTemplate: true, token: token, document: document})
                    
                }
            }
        })
})
router.get('/signinUsers', async (request, response) => {
    signUpTemplateCopy.find({
        username: request.query.username,
        passWord: request.query.passWord
    }, async (err, documents) => {
        if (err) {
            response.send('error');
        } else {
            if (documents.length === 0) {
                return response.json({ status: 'incorrect username or password', officialsTemplate: false });
            } else {
                const document = documents[0];
                const locationDocuments = await signUpLocation.find({
                barangayName: document.barangayName 
            });
                const token = jwt.sign({
                    signUpTemplateCopy: document.firstName,
                    signUpTemplateCopy: document.email
                }, 'secret');

                return response.json({
                    status: 'Login Successful',
                    signUpTemplateCopy: document,
                    locationDocuments: locationDocuments,
                    token: token
                });
            }
        }
    });
});

//get data output to table(resident)
router.get('/getUsers', async (request, response) => {

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
router.get('/getlocation', async (request, response) => {

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

router.get('/gethotline', async (request, response) => {

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
router.get('/getRooms', async (request, response) => {

    signUpRoom.find({}, async (error, document) => {
        if (error) {
            response.send("error")
        }
        else {
            response.send(document)
        }
    })
})

router.get('/getBarangays', async (request, response) => {

    signUpBarangay.find({}, async (error, document) => {
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
        id:request.body.id,
        roomName:request.body.roomName
        
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


//removeuser users
router.get('/updateUsers', (request, response) => {
  signUpTemplateCopy.findOneAndUpdate(
    {
      _id: request.query._id,
      firstName: request.query.firstName
    },
    {
      roomName: request.query.roomName
    },
    function (err) {
      if (err) {
        response.send('Updating Document failed');
      } else {
        response.send('Document Updated Successfully');
      }
    }
  );
});

router.get('/editUsers', (request, response) => {
    signUpTemplateCopy.findOneAndUpdate(
      {
        id: request.query.id,
      },
      {
        firstName: request.query.firstName,
        lastName: request.query.lastName,
        contactNo: request.query.contactNo,
        name: request.query.name,
        address: request.query.address,
        latitude: request.query.latitude,
        longtitude: request.query.longtitude,
        status: request.query.status,
        username: request.query.username,
        passWord: request.query.passWord,
        age: request.query.age,
        inoutStatus: request.query.inoutStatus,
        roomName: request.query.roomName
      },
      { new: true },
      async (err, document) => {
        if (err) {
          response.send('Updating Document failed');
        } else {
          response.send({ message: 'Document Updated Successfully', document });
        }
      }
    );
  });

router.post('/addUsersToRoom', (request, response) => {
    signUpTemplateCopy.findOneAndUpdate({
        username:request.body.username
    }, {
        roomName:request.body.roomName
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
        
    }, {
        name: request.body.name,
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

router.post('/removeAllRes', (request, response) => {
    signUpTemplateCopy.updateMany(
        // Filter to match documents
        {
             name: request.body.name
        },
        // Update operation
        {
            $set: {
                roomName: "",
                name: ""
            }
        },
        function(err) {
            if (err) {
                response.send('Update Document Failed');
            } else {
                response.send('Documents Updated Successfully');
            }
        }
    );
});


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

//auto room assigned
router.post('/addToRoom', (request, response) => {
    signUpTemplateCopy.findOneAndUpdate({
        id:request.body.id,
        username:request.body.username
    }, {
        roomName:request.body.roomName,
        inoutStatus:request.body.inoutStatus
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