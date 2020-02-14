const express = require('express');
const activityInputRouter = new express.Router();
const ActivityInput = require('../models/activityInput')

activityInputRouter.post('/activityInput/',async(req,res) => {
    try{
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
activityInputRouter.get('/activityInput/:id/', async(req, res) => {
    try{
        console.log(req)
        const activityInput = await ActivityInput.findById(req.params.id);
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
activityInputRouter.get('/allActivityInputs/', async(req, res) => {
    try{
        const allActivityInputs = await ActivityInput.find(req.body);
        // return value even if empty 
        res.send(allActivityInputs)
    }catch(error){
        res.status(404)
        res.send("error fetch all use activity inputs")
    }
})

module.exports = activityInputRouter;