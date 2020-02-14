const express = require('express')

const ActivityPoint = require('../models/activityPoints')
const activityPointRouter = new express.Router()

activityPointRouter.post('/activityPoint/', async(req,res) => {
    try{
        const newActivityPoint = new ActivityPoint(req.body)
        const savedActivityPoint = await newActivityPoint.save();
        res.send(`activity point created ${savedActivityPoint}`);
    }catch(error){
        console.log(error)
        res.send('error trying to create activity point')
    }
})



module.exports = activityPointRouter