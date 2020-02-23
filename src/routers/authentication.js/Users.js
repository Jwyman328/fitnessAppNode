const express = require('express');
const User = require('../../models/Users')
const jwt  = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userRouter = new express.Router();
const auth = require('../../middleware/auth')
const getAllUserNamesExceptCurrentUser = require('../../utils/getAllUserNamesExceptCurrentUser')
/**
 * create and return a token when is valid sign in
 */
userRouter.post('/user/login', async (req, res) => {
    try{
        // get User by email
        const user = await User.findOne({email: req.body.data.email});
        //try to match hashed password with entered password
        const isPasswordMatching =  await bcrypt.compare(req.body.data.password, user.password)
        if (isPasswordMatching){
            // create a token for user and send it back
            const token = await user.generateJWTToken()
            res.send({token:token})
        }else{
            res.status('400').send('password is invalid')
        }

    }catch(error){
        console.log(error)
        res.status(400).send('error email does not exist')
    }
})

userRouter.post('/user/create/',async (req,res)=> {
    console.log(req.body.data, 'hi')
    try{
        // give users a jwt token 
        const newUser = new User(req.body.data)
        newUser.generateJWTToken()
        res.send(newUser)
    }catch(error){
        res.status('400')
        res.send(`error on user creation ${error}`)
    }
});

userRouter.get('/user/profile/',auth, async (req, res) => {
    //should return user profile data but not password or token data
    try{
        const copyUser = {email: req.user.email, totalPoints: req.user.totalPoints}
        res.send(copyUser)
    }catch(error){
        res.status(400)
        .send('could not find user profile')
    }
})

/**
 * Return an array of all users emails except the email of the user making the request.
 */
userRouter.get('/user/allUsers/',auth, async (req, res) => {
    try{
        const allUserNamesExceptCurrentUser = await getAllUserNamesExceptCurrentUser(req.user)
        res.send(allUserNamesExceptCurrentUser)
    }catch(error){
        res.status(400)
        .send('could not find any users')
    }
})

module.exports = userRouter;