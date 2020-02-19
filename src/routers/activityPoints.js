const express = require('express')
const auth = require('../middleware/auth')
const ActivityPoint = require('../models/activityPoints')
const activityPointRouter = new express.Router()

activityPointRouter.post('/activityPoint/', auth, async(req,res) => {
    try{
        req.body.user = req.user._id
        const newActivityPoint = new ActivityPoint(req.body);
        const savedActivityPoint = await newActivityPoint.save();
        res.send(`activity point created ${savedActivityPoint}`);
    }catch(error){
        console.log(error)
        res.send('error trying to create activity point')
    }
})

// find specific activity point by id
activityPointRouter.get('/activityPoint/:id/',auth, async(req,res)=>{
    try{
        const specificActivityPoint = await ActivityPoint.findOne({_id : req.params.id, user: req.user._id});
        //if activity point found.
        if (specificActivityPoint){
            res.send(specificActivityPoint);
        }else{
            // if empty 
            res.status(400)
            res.send('activity point not found')
        }
    }catch(error){
        res.status(400)
        res.send('Error fetching activity point')
    }
})

//find all activity points for user 
activityPointRouter.get('/allActivityPoints/mine/',auth, async(req,res)=>{
    try{
        const allUserActivityPoints = await ActivityPoint.find({user:req.user._id});
        //if activity point found.
        if (allUserActivityPoints){
            res.send(allUserActivityPoints);
        }else{
            // if empty 
            res.send('activity points not found')
        }
    }catch(error){
        res.status(400)
        res.send('Error fetching all activity point')
    }
})


module.exports = activityPointRouter