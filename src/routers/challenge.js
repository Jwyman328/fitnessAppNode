const express = require("express");
const auth = require("../middleware/auth");
const challengeRouter = new express.Router();
const Challenge = require("../models/challenge");
//const checkIsNullResponse = require('../playground/checkIsNullResponse')
const checkUpDateTargetFound = require("../playground/checkUpDateTargetFound");
const UpdateTargetNotFoundError = require('../playground/updateTargetNotFoundError')
/**
 * Create a challenge.
 *
 * This Challenge creation will also create all individual challenge invitations for
 * all invitees.
 */
challengeRouter.post("/", auth, async (req, res) => {
  try {
    req.body.creator = req.user.email;
    const newChallenge = await new Challenge(req.body);
    const savedChallenge = await newChallenge.save();
    res.send(`challenge created: ${savedChallenge} `);
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send("Error creating challenge");
  }
});

/**
 * Return a challenge object create by the current user, by id.
 */
challengeRouter.get("/:id/", auth, async (req, res) => {
  try {
    console.log({ _id: req.params.id, creator: req.user._id });
    const challenge = await Challenge.findOne({
      _id: req.params.id,
      creator: req.user._id,
    });
    if (challenge) {
      res.send(challenge);
    } else {
      res.send(`could not find challenge with id ${req.params.id}`);
    }
  } catch (error) {
    res.status(400);
    res.send(`error fetching ${req.params.id} `);
  }
});

/**
 * Return all challenges the user is involved in.
 */
challengeRouter.get("/", auth, async (req, res) => {
  try {
    const challenges = await Challenge.find(req.body);
    if (challenges === []) {
      res.send(`user does not have any challenges`);
    } else {
      res.send(challenges);
    }
  } catch (error) {
    res.status(400);
    res.send(`error fetching challenges for ${req.body} `);
  }
});

const newChalData = {creator: 'User._id',
  challengeType: "Sleep",
  title: "testChallenge",
  participants: ["testFriend"],
  invitees: ["testFriend"],
  startDate: new Date(),
  endDate: new Date()}

/// tsting area playground
function forgotPassword(user) {
  return async (email, urlName) => {
    return new Promise(async (resolve, reject) => {
      try{
        const upDateTargetNotFoundError = new UpdateTargetNotFoundError(
          "user",
          email
        )
        const targetOrg = await Challenge.findOne(
          { urlName:'find' },
          function (err, results){
            checkUpDateTargetFound(err, results, reject,upDateTargetNotFoundError )
          }
        );
        //const emailRegex = email_util.emailRegex(email);
       
        const targetUser = await Challenge.findOne(
          {},
          function (err, results){
            checkUpDateTargetFound(err, results, reject,upDateTargetNotFoundError )
          }
        );
       // const token = resetUserToken(targetUser);
        return resolve('token') ; // would be token obj
      }catch(e){
        console.log('caught')
        reject(e)
      }
    })  
  };
} 

const arrayOfDbReq = {
  forgotPassword: forgotPassword
};

challengeRouter.get("/mongoTest", async (req, res) => {
  try {
    console.log('here')
    const waited = await arrayOfDbReq.forgotPassword({ name: "joe" })(
      "email",
      "urlName"
    )
    console.log(waited, "kk");
  } catch (e) {
    console.log(e, "the error");
  }

  res.send("hi");
});

module.exports = challengeRouter;
//UpdateTargetNotFoundError { name: 'UpdateTargetNotFoundError' } the error
