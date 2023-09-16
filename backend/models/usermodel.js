const mongoose = require('mongoose')
const userschema =mongoose.Schema({
    name: {
        type: String,
        required : [true, ' Input Your Name ']
    },
    email: {
        type: String,
        required : [true, ' Input Your Email '],
        unique : true 
    
    },
    password: {
        type: String,
        required : [true, ' Input Your Password '],
       
        
    
    },

    isAdmin: {
        type: Boolean,
        required : true,
        default: false
    }
},
 {
timestamps : true,
 }
)

module.exports = mongoose.model('User',userschema)