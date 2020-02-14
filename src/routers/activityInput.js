const express = require('express');
const activityRouter = new express.Router();
const ActivityInput = require('../models/activityInput')

activityRouter.post('/activityInput/',async(req,res) => {
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

module.exports = activityRouter;