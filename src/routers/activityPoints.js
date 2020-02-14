const express = require('express')

const ActivityPoint = require('../models/activityPoints')
const activityPointRouter = new express.Router()

activityPointRouter.post('/activityPoint/', async(req,res) => {
    try{
        const newActivityPoint = new ActivityPoint(req.body);
        const savedActivityPoint = await newActivityPoint.save();
        res.send(`activity point created ${savedActivityPoint}`);
    }catch(error){
        console.log(error)
        res.send('error trying to create activity point')
    }
})

// find specific activity point by id
activityPointRouter.get('/activityPoint/:id/', async(req,res)=>{
    try{
        const specificActivityPoint = await ActivityPoint.findById(req.params.id);
        //if activity point found.
        if (specificActivityPoint){
            res.send(specificActivityPoint);
        }else{
            // if empty 
            res.send('activity point not found')
        }
    }catch(error){
        res.status(400)
        res.send('Error fetching activity point')
    }
})

//find all activity points for user 
activityPointRouter.get('/allActivityPoints/', async(req,res)=>{
    try{
        console.log(req);
        const allUserActivityPoints = await ActivityPoint.find(req.body);
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