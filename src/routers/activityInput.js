const express = require('express');
const activityInputRouter = new express.Router();
const ActivityInput = require('../models/activityInput')
const auth = require('../middleware/auth')

activityInputRouter.post('/activityInput/',auth, async(req,res) => {
    try{
        req.body.user = req.user._id
        console.log(req.body)
        const newActivityInput = new ActivityInput(req.body);
        const savedActivityInput = await newActivityInput.save();
        res.send('new activity input created')
    }catch(error){
        console.log(error)
        res.status(400)
        res.send('error creating activity')
    }
})

// get individual activity input 
activityInputRouter.get('/activityInput/:id/',auth, async(req, res) => {
    try{
        const activityInput = await ActivityInput.findOne({_id:req.params.id, user: req.user._id});
        if (activityInput){
            res.send(activityInput)
        }else{
            res.send('activity input requested not found')
        }
    }catch(error){
        console.log(error)
        res.status(400)
        res.send('error on fetching activity input')
    }
})

// get all of a user's activity inputs
activityInputRouter.get('/allActivityInputs/',auth, async(req, res) => {
    try{
        const allActivityInputs = await ActivityInput.find({user: req.user.id});
        // return value even if empty 
        res.send(allActivityInputs)
    }catch(error){
        res.status(404)
        res.send("error fetch all use activity inputs")
    }
})

module.exports = activityInputRouter;