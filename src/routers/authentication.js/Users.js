const express = require('express');
const User = require('../../models/Users')
const jwt  = require('jsonwebtoken')
const userRouter = new express.Router();

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

module.exports = userRouter;