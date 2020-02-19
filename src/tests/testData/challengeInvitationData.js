const User = require('./userData')
const mongoose = require('mongoose')
const challengeInvitationId = mongoose.Types.ObjectId()

const challengeInvitationData = {
    _id:challengeInvitationId,
    creator: User._id,
    invitee: User._id,
    challengeType: 'Sleep',
    title: 'testTitle',
    startDate: new Date(),
    endDate: new Date(),
    status: 'pending',
}


module.exports = challengeInvitationData;