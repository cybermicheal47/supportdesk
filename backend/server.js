const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const PORT = process.env.PORT   || 5000

//connect to db
connectDB()
const app = express() 

const { errorHandler } = require('./middleware/errormiddleware');

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/',(req,res)=>{
    res.json('Welcome to support desk')
})

//ROUTES
app.use('/api/users', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen(PORT, ()=> console.log(`server running on port ${PORT}`))