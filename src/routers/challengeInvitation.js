const express = require('express');
const auth = require('../middleware/auth')
const ChallengeInvitation = require('../models/challengeInvitation')
const ChallengeInvitationRouter = new express.Router();

// create Invitation;
ChallengeInvitationRouter.post('/challengeInvitation/',auth, async(req,res) => {
    try{
        req.body.creator = req.user._id;
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
ChallengeInvitationRouter.get('/challengeInvitation/:id/', auth,  async(req, res) => {
    try{
        console.log({_id:req.params.id, creator: req.user._id},'input')
        const challengeInvitation = await ChallengeInvitation.findOne({_id:req.params.id, creator: req.user._id});
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
ChallengeInvitationRouter.get('/AllChallengeInvitation/myInvitations/',auth, async(req, res) => {
    try{
        const allChallengeInvitation = await ChallengeInvitation.find({invitee:req.user._id});
        res.send(allChallengeInvitation);
    }catch(error){
        res.status(400);
        res.send('error fetching challenge invitations');
    }
    
});

// get invitation by creator
ChallengeInvitationRouter.get('/AllChallengeInvitationByCreator/mine/',auth, async(req, res) => {
    try{
        const allChallengeInvitation = await ChallengeInvitation.find({creator:req.user._id});
        res.send(allChallengeInvitation);
    }catch(error){
        res.status(400);
        res.send('error fetching challenge invitations');
    }
});

//ChangeStatus of challengeInvitation 
// use param to get ChallengeInvitation
// use body to set value, pending, accepted or rejected
// body json should be like {"status": "accepted"}
ChallengeInvitationRouter.patch('/updateChallengeStatus/:id/',auth, async(req,res)=> {
    try{
        const challengeInvitation = await ChallengeInvitation.findOneAndUpdate({_id: req.params.id,creator:req.user._id }, req.body,{new:true, runValidators:true});
        res.send(`updated, new challenge invitation: ${challengeInvitation}`);
    }catch(error){
        res.send(`error updating invitation with id :${req.params.id}`);
    }
})

module.exports = ChallengeInvitationRouter;

