const express = require('express')
const auth = require('../middleware/auth')
const TotalPointGoal = require('../models/totalPointGoal')
const totalPointGoalRouter = new express.Router();

totalPointGoalRouter.post('/totalPointGoal/',auth, async(req, res) => {
    try{
        req.body.user = req.user._id
        const newTotalPointGoal = await new TotalPointGoal(req.body);
        const savedTotalPointGoal = await newTotalPointGoal.save();
        res.send(`new total point goal created ${savedTotalPointGoal}`);
    }catch{
        res.status(400);
        res.send('error creating total point goal')
    }
});

totalPointGoalRouter.get('/totalPointGoal/:id/',auth, async(req, res) => {
    try{
        const totalPointGoal = await TotalPointGoal.findOne({_id:req.params.id, user:req.user._id });
        if (totalPointGoal){
            res.send(totalPointGoal);
        }else{
            res.send(`could not get total point goal with ${totalPointGoal}`)
        }
    }catch(error){
        res.status(400)
        res.send(`error getting point goal with id ${req.params.id}`)
    }
});

// get all goals by user
totalPointGoalRouter.get('/allTotalPointGoal/',auth, async(req,res) => {
    try{
        const allPointGoals = await TotalPointGoal.find({user:req.user._id});
        res.send(allPointGoals)
    }catch(error){
        res.status(400)
        res.send('error getting user point goals')
    }
})

totalPointGoalRouter.get('/currentGoals/', auth,async(req,res) => {
    try{
        const currentGoals = await TotalPointGoal.find({user: req.user._id,
        goalStartDate: {$lte: new Date().toISOString()},
        goalEndDate: {$gte: new Date().toISOString()}})
         res.send(currentGoals)
    }catch(error){
        res.send(error)

    }
})

totalPointGoalRouter.get('/futureGoals/', auth, async(req,res) => {
    try{
        const currentGoals = await TotalPointGoal.find({user: req.user._id,
        goalStartDate: {$gte: new Date().toISOString()},
        goalEndDate: {$gte: new Date().toISOString()}})
         res.send(currentGoals)
    }catch(error){
        res.send(error)
    }
})

module.exports = totalPointGoalRouter;