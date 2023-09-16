const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')

const User = require('../models/usermodel')

const jwt = require('jsonwebtoken')


const registereduser = asyncHandler ( async (req,res) => {
    const{name,email,password} = req.body

//validation

if(!name || !email || !password) {
  res.status(400)
  throw new Error('Please  include all fields')
}

//find if users exist 

const userexist = await User.findOne({email})
if(userexist){
    res.status(400)
    throw new Error ("User already exist")
}
//Hash Password

salt = await bcrypt.genSalt(10)
const hashedpassword = await bcrypt.hash(password, salt)



//Create User
 const user = await User.create({
    name,
    email,
    password : hashedpassword
 })

if (user) {
    const token = generatetoken(user._id);
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token : token,
    })
   
} else{
    res.status(400)
    throw new error ('invalid credentials')
}


}
)
const loginuser =  asyncHandler (async (req,res)=> {
  const {email,password} = req.body
  const user = await User.findOne({email})

//check user and password match 
if(user && (await bcrypt.compare(password, user.password))){
    res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token : generatetoken(user._id)
    })
} else{
    res.status(401)
    throw new Error("Invalid Credentials")
}
}
)
//Generate token

const generatetoken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d',
    })
}


const getme = asyncHandler(async (req, res) => {
    const user = {

        id: req.user._id,
        
        email: req.user.email,
        
        name: req.user.name,
        
        };
        
        res.status(200).json(user);
        
        });




module.exports = {
    registereduser,
    loginuser,
    getme
}