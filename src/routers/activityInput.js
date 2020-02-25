const express = require('express');
const activityInputRouter = new express.Router();
const ActivityInput = require('../models/activityInput')
const auth = require('../middleware/auth')
const  updateActivityPointfromActivityInput = require('../utils/updateActivityPointFromActivityInput')
activityInputRouter.post('/activityInput/',auth, async(req,res) => {
    try{
        req.body.user = req.user._id
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

//update activity input by id 
activityInputRouter.patch('/activityInput/:id/',auth, async(req,res)=> {
    try{
        //creator:req.user._id 
        const activityInputUpdate = await ActivityInput.findOneAndUpdate({_id: req.params.id}, req.body.newData,{new:true, runValidators:true});
        // update the corresponding point model too 
        const updatePointModel = await updateActivityPointfromActivityInput(activityInputUpdate)
        res.send(`updated, activityInput: ${activityInputUpdate}`);
    }catch(error){
        res.status(400)
        console.log(error)
        res.send(`error updating activity input with id :${req.params.id}`);
    }
})

module.exports = activityInputRouter;