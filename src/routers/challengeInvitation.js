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

// get all pending challenge invitations for user
ChallengeInvitationRouter.get('/AllChallengeInvitation/myInvitations/pending',auth, async(req, res) => {
    try{
        const allChallengeInvitation = await ChallengeInvitation.find({invitee:req.user.email,status:'pending'});
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
        //creator:req.user._id 
        const challengeInvitation = await ChallengeInvitation.findOneAndUpdate({_id: req.params.id}, req.body,{new:true, runValidators:true});
        res.send(`updated, new challenge invitation: ${challengeInvitation}`);
    }catch(error){
        res.send(`error updating invitation with id :${req.params.id}`);
    }
})

// get all challenges that the user has accepted that are past todays date

ChallengeInvitationRouter.get('/pastChallenges/', auth, async(req,res) => {
    try{
        const challengeInvitation = await ChallengeInvitation.find({invitee: req.user.email,status:'accepted',
         endDate: {$lte: new Date().toISOString()}})
         res.send(challengeInvitation)
    }catch(error){
        res.send(error)

    }
})

//get all past challenges
ChallengeInvitationRouter.get('/pastChallenges/', auth, async(req,res) => {
    try{
        const pastChallenges = await ChallengeInvitation.find({invitee: req.user.email,status:'accepted',
         endDate: {$lte: new Date().toISOString()}})
         res.send(pastChallenges)
    }catch(error){
        res.send(error)

    }
})

// get all current challenges 
ChallengeInvitationRouter.get('/currentChallenges/', auth, async(req,res) => {
    try{
        const currentChallenges = await ChallengeInvitation.find({invitee: req.user.email,status:'accepted',
        startDate: {$lte: new Date().toISOString()},
         endDate: {$gte: new Date().toISOString()}})
         res.send(currentChallenges)
    }catch(error){
        res.send(error)

    }
})

// get all future challenges 
ChallengeInvitationRouter.get('/futureChallenges/', auth, async(req,res) => {
    try{
        const currentChallenges = await ChallengeInvitation.find({invitee: req.user.email,status:'accepted',
        startDate: {$gte: new Date().toISOString()},
         endDate: {$gte: new Date().toISOString()}})
         res.send(currentChallenges)
    }catch(error){
        res.send(error)

    }
})



module.exports = ChallengeInvitationRouter;

