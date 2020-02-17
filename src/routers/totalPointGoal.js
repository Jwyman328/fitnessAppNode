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
        const totalPointGoal = await TotalPointGoal.findById(req.params.id);
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

module.exports = totalPointGoalRouter;