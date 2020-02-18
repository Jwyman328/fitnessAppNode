const express = require('express');
const User = require('../../models/Users')
const jwt  = require('jsonwebtoken')
const userRouter = new express.Router();
const auth = require('../../middleware/auth')
userRouter.get('/user/login', async (req, res) => {
    // create token when sign in 
})

userRouter.post('/user/create/',async (req,res)=> {
    console.log(req.body)
    try{
        // give users a jwt token 
        const newUser = new User(req.body)
        newUser.generateJWTToken()
        //const savedUser = await newUser.save()
        //savedUser.generateJWTToken()
        res.send('New User Created')
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

module.exports = userRouter;