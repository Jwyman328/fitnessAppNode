const express = require('express');

const ChallengeInvitation = require('../models/challengeInvitation')
const ChallengeInvitationRouter = new express.Router();

// create Invitation;
ChallengeInvitationRouter.post('/challengeInvitation/', async(req,res) => {
    try{
        const newChallengeInvitation = new ChallengeInvitation(req.body);
        const savedChallngeInvitation = await newChallengeInvitation.save();
        res.send(savedChallngeInvitation);
    }catch(error){
        console.log(error)
        res.status(400);
        res.send('error creating challenge invitation');
    }
});

//get challenge invitation by id
ChallengeInvitationRouter.get('/challengeInvitation/:id/', async(req, res) => {
    try{
        const challengeInvitation = await ChallengeInvitation.findById(req.params.id);
        if (challengeInvitation){
            res.send(challengeInvitation);
        }else{
            res.status(400);
            res.send(`could not find challenge invitation with id ${req.params.id}`)
        }
        
    }catch(error){
        res.status(400);
        res.send(`error fetching challenge invitation with id ${req.params.id}`)

    }
})

//get by user
// req.body = {"invitee": "thisUser"}
ChallengeInvitationRouter.get('/AllChallengeInvitation/', async(req, res) => {
    try{
        const allChallengeInvitation = await ChallengeInvitation.find(req.body);
        res.send(allChallengeInvitation);
    }catch(error){
        res.status(400);
        res.send('error fetching challenge invitations');
    }
    
});

module.exports = ChallengeInvitationRouter;

