const User = require('./userData')
const mongoose = require('mongoose')
const challengeId = mongoose.Types.ObjectId()

const challenge = {
    _id: challengeId,
    creator : User._id,
    challengeType: 'Sleep',
    title: 'testChallenge',
    participants: ['testFriend'],
    invitees: ['testFriend'],
    startDate: new Date(),
    endDate: new Date(),
}

module.exports = challenge;