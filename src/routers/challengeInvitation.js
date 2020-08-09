const express = require("express");
const auth = require("../middleware/auth");
const ChallengeInvitation = require("../models/challengeInvitation");
const ChallengeInvitationRouter = new express.Router();

/**
 * Create and return a challenge invitation.
 */
ChallengeInvitationRouter.post(
  "/challengeInvitation/",
  auth,
  async (req, res) => {
    try {
      req.body.creator = req.user._id;
      const newChallengeInvitation = new ChallengeInvitation(req.body);
      const savedChallngeInvitation = await newChallengeInvitation.save();
      res.send(savedChallngeInvitation);
    } catch (error) {
      console.log(error);
      res.status(400);
      res.send("error creating challenge invitation");
    }
  }
);



/**
 * Return an array of all challengeInvitations of the current user.
 *
 */
ChallengeInvitationRouter.get(
  "/challengeInvitation/", //challengeInvitation
  auth,
  async (req, res) => {
    try {
      const allChallengeInvitationsForUser = await ChallengeInvitation.find({
        invitee: req.user._id,
      });
      res.send(allChallengeInvitationsForUser);
    } catch (error) {
      res.status(400);
      res.send("error fetching challenge invitations");
    }
  }
);

/**
 * Return all challenge invitations with a status of pending for the current user.
 */
ChallengeInvitationRouter.get(
  "/challengeInvitation/pending",
  auth,
  async (req, res) => {
    try {
      const allChallengeInvitation = await ChallengeInvitation.find({
        invitee: req.user.email,
        status: "pending",
      });
      res.send(allChallengeInvitation);
    } catch (error) {
      res.status(400);
      res.send("error fetching challenge invitations");
    }
  }
);

/**
 * Return array of all challenge invitations created by the current user.
 */
ChallengeInvitationRouter.get(
  "/AllChallengeInvitationByCreator/mine/",
  auth,
  async (req, res) => {
    try {
      const allChallengeInvitation = await ChallengeInvitation.find({
        creator: req.user._id,
      });
      res.send(allChallengeInvitation);
    } catch (error) {
      res.status(400);
      res.send("error fetching challenge invitations");
    }
  }
);


/**
 * Update a challenge invitation status from pending to accepted or denied.
 * 
 * The request body will contain status change information.
 * Example request body:
 * {"status": "accepted"}
 * 
 * @Return success message of challenge invitation status change.
 */
ChallengeInvitationRouter.patch(
  "/challengeInvitation/:id/",
  auth,
  async (req, res) => {
    try {
      //creator:req.user._id
      const challengeInvitation = await ChallengeInvitation.findOneAndUpdate(
        { _id: req.params.id },
        req.body,
        { new: true, runValidators: true }
      );
      res.send(`updated, new challenge invitation: ${challengeInvitation}`);
    } catch (error) {
      res.send(`error updating invitation with id :${req.params.id}`);
    }
  }
);

/**
 * Return an array of all accepted challengeInvitations by the current user before today's date.
 */
ChallengeInvitationRouter.get("/challengeInvitation/pastChallenges/", auth, async (req, res) => {
  try {
    const pastChallenges = await ChallengeInvitation.find({
      invitee: req.user.email,
      status: "accepted",
      endDate: { $lte: new Date().toISOString() },
    }).sort("-endDate");
    res.send(pastChallenges);
  } catch (error) {
    res.send(error);
  }
});

 /**
  *  Return an array of all currently on going accepted challengeInvitations of the current user.
  */
ChallengeInvitationRouter.get("/challengeInvitation/currentChallenges/", auth, async (req, res) => {
  try {
    const currentChallenges = await ChallengeInvitation.find({
      invitee: req.user.email,
      status: "accepted",
      startDate: { $lte: new Date().toISOString() },
      endDate: { $gte: new Date().toISOString() },
    }).sort("endDate");
    res.send(currentChallenges);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Return an array of all accepted challengeInvitations that have a future start date.
 */
ChallengeInvitationRouter.get("/challengeInvitation/futureChallenges/", auth, async (req, res) => {
  try {
    const currentChallenges = await ChallengeInvitation.find({
      invitee: req.user.email,
      status: "accepted",
      startDate: { $gte: new Date().toISOString() },
      endDate: { $gte: new Date().toISOString() },
    }).sort("startDate");
    res.send(currentChallenges);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Return a challenge invitation created by the current user, by id.
 */
ChallengeInvitationRouter.get(
  "/challengeInvitation/:id/",
  auth,
  async (req, res) => {
    try {
      console.log({ _id: req.params.id, creator: req.user._id }, "input");
      const challengeInvitation = await ChallengeInvitation.findOne({
        _id: req.params.id,
        creator: req.user._id,
      });
      if (challengeInvitation) {
        res.send(challengeInvitation);
      } else {
        res.status(400);
        res.send(
          `could not find challenge invitation with id ${req.params.id}`
        );
      }
    } catch (error) {
      res.status(400);
      res.send(`error fetching challenge invitation with id ${req.params.id}`);
    }
  }
);

module.exports = ChallengeInvitationRouter;
