const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const userOneId = mongoose.Types.ObjectId()
/**
 * userData to create a User model.
 */
let userData = {
    _id: userOneId,
    date: Date(),
    email:'testEmail@gmail.com',
    password:'testPassword',
    totalPoints:0,
    token: jwt.sign({_id: userOneId.toHexString()}, 'secretcode')
}


module.exports = userData;