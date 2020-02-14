const express = require('express');
const User = require('../models/Users')
const userRouter = new express.Router();

userRouter.post('/user/create/',async (req,res)=> {
    console.log(req.body)
    try{
        const newUser = new User(req.body)
        const savedUser = await newUser.save()
        res.send('New User Created')
    }catch(error){
        res.status('400')
        res.send('error on user creation')
    }
});

module.exports = userRouter;