var dotenv = require('dotenv')
dotenv.config()
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smpt.gmail.com',
    secure: false,
    auth:{
        user: process.env.EMAIL_TEST,
        pass: process.env.EMAIL_TEST_APP_PSWD
    },
})

module.exports = {
    verifyUserEmail: async function verifyUserEmail(firstName, lastName, userEmail,email, token){
        try{
            let info = await transporter.sendMail({
                from: process.env.EMAIL_TEST,
                to: userEmail,
                subject: "Hello" + firstName + lastName + "please verify your email by clicking the link",
                html: process.env.homePageDev+"/verifyUserEmail/" + email + "/" + token,
            })
        }catch (err){
            console.log(err)
        }
    }
}