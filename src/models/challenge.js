const mongoose = require("mongoose");
const ChallengeInvitation = require("./challengeInvitation");

/**
 * Challenge Schema
 */
const challengeSchema = new mongoose.Schema({
  creator: {
    type: String,
  },
  challengeType: {
    type: String,
    default: "totalPoints",
    validate(challengeType) {
      const challengeTypes = [
        "Sleep",
        "Water",
        "Clean Eating",
        "Steps",
        "totalPoints",
        "Workout",
      ];
      if (!challengeTypes.includes(challengeType)) {
        throw Error(`challenge type ${challengeType} is not available `);
      }
    },
  },
  title: {
    type: String,
  },
  participants: {
    type: Array,
    default: [],
  },
  invitees: {
    type: Array,
    default: [],
  },
  startDate: {
    type: Date,
    default: new Date(),
  },
  endDate: {
    type: Date,
    default: new Date(),
  },
});

/**
 * After saving the object create a challenge invitation 
 * object for every user invited to the challenge.
 * And, create and automatically accept the challenge invitation 
 * for the user who created it.
 */
challengeSchema.post("save", async function () {
  try {
    const challenge = this;
    this.invitees.map((invitee) => {
      ChallengeInvitation({
        creator: this.creator,
        relatedChallengeId: this._id,
        invitee: invitee,
        challengeType: this.challengeType,
        title: this.title,
        startDate: this.startDate,
        endDate: this.endDate,
        status: "pending",
      }).save();
    });
    //*create a challenge invitation for the creator but with a status of accepted
    ChallengeInvitation({
      creator: this.creator,
      relatedChallengeId: this._id,
      invitee: this.creator,
      challengeType: this.challengeType,
      title: this.title,
      startDate: this.startDate,
      endDate: this.endDate,
      status: "accepted",
    }).save();
  } catch (error) {
    console.log(error);
  }
});

const Challenge = mongoose.model("challenge", challengeSchema);
module.exports = Challenge;
