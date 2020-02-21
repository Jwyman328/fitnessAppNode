const mongoose = require('mongoose')
const validator = require('validator')
const hash = require('bcryptjs')// hash passwords 
const jwt = require('jsonwebtoken')
const UserSchema = new mongoose.Schema({
    email: {
        type:String,
        validate(email){
            if (!validator.isEmail(email)){
                throw Error('invalid email')
            }
          
        }
    },
    password:{
        type:String,
        validate(password){
            if (!password.length > 7){
                throw Error('invalid password length must be more than 7 characters')
            }
        }
    },
    token: {
            type: String,
            required:true
        }
    ,
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


UserSchema.pre('save', async function(next){
    try{
        const user = this
        if (user.isModified('password')){
            user.password = await hash.hash(user.password, 8);
            
        }
        next()

    }catch(error){
        console.log('error with ')
    }
    
})
// generate a token on creation of user/ sign up
UserSchema.methods.generateJWTToken = async function(){
    try{
        const user = this
        console.log(user,'userr')
        const newToken = jwt.sign( {_id: user._id.toString()}, 'secrectcode')
        //console.log(newToken gi,'nt')
        user.token = newToken // add token to array of tokens.
        await user.save()
        return newToken
    }catch(error){
        console.log(error)
    }
    
}
const User = mongoose.model('User',UserSchema)

module.exports = User;