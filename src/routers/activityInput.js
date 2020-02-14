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

module.exports = activityInputRouter;