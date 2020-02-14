const mongoose = require('mongoose')
const validator = require('validator')

const User = mongoose.model('User',{
    email: {
        type:String,
        validate(email){
            if (!validator.isEmail(email)){
                throw Error('invalid email')
            }
          
        }
    },
    totalPoints: {
        type:Number,
        default:0,
        validate(totalPoints){
            if (totalPoints < 0){
                throw Error('Must be positive number')
            }
        }
    }
})

module.exports = User;