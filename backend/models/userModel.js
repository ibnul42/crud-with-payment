const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type: String
    },
    email:{
        type: String,
        unique: true
    },
    password:{
        type: String,
    }, 
    gender:{
        type: String,
    },
    birthDate:{
        type: String,
    },
    subscription: {
        type: Boolean
    }    
}, {
    timestams: true
})

module.exports = mongoose.model('User', userSchema)