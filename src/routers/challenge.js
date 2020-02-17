const express = require('express')
const auth = require('../middleware/auth')
const challengeRouter = new express.Router();
const Challenge = require('../models/challenge')

challengeRouter.post('/challenge/',auth, async(req, res) => {
    try{
        console.log(req.body)
        const newChallenge = await new Challenge(req.body);
        const savedChallenge = await newChallenge.save();
        res.send(`challenge created: ${savedChallenge} `)
    }catch(error){
        console.log(error)
        res.status(400);
        res.send('Error creating challenge');
    }
})

// get by id 
challengeRouter.get('/challenge/:id/',auth, async(req, res) => {
    try {
        const challenge = await Challenge.findById(req.params.id);
        if (challenge){
            res.send(challenge)
        }else{
            res.send(`could not find challenge with id ${req.params.id}`)
        }

    }catch(error){
        res.status(400);
        res.send(`error fetching ${req.params.id} `)
    }
})

//get by user
challengeRouter.get('/allChallenges/',auth, async(req, res) => {
    try {
        const challenges = await Challenge.find(req.body);
        console.log(challenges)
        if (challenges === []){
            res.send(`user does not have any challenges`)
        }else{
            res.send(challenges)
        }

    }catch(error){
        res.status(400);
        res.send(`error fetching challenges for ${req.body} `)
    }
})


module.exports = challengeRouter;
