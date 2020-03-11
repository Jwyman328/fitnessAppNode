// make an auth middleware to return the user or deny request.
// must first give the user a token
// hash password 
// hide sensitive data 
const User = require('../models/Users')
const jwt = require('jsonwebtoken')
const {redisClient} = require('../db/redisClient')

async function authMiddleWare(req, res, next){

    try{
        //const token = req.body.headers.Authentication
        const token = req.header('Authorization').replace('Bearer ', '')
        const email = await redisClient.getAsync(token)
        const user =  await User.findOne({email: email})
        //const user = await User.findOne({token: token}) 
        //const allUsers = await User.find({})
        req.user = user // add the user to the request 
        if (user){
            next()
        }else{
            throw Error('no token')
        }
    } catch(error){
        console.log(error)
        res.status(401).send('error on authentication')
    }
  
}

module.exports = authMiddleWare;