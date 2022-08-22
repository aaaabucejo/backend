const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv= require('dotenv')
const routerUrls = require('./routes/routes')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () =>console.log("Database user connected"))
// mongoose.connect(process.env.DATABASE_ACCESSLOCATION, () =>console.log("Database location connected"))
app.get("/",(req,res) => {
    res.send("Hellooo ")
})
app.use(express.json())
app.use(cors())
app.use('/app', routerUrls)
app.listen(4000, () => console.log("server is up and running"))