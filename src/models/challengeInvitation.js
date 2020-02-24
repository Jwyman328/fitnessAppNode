const mongoose = require('mongoose');

const ChallengeInvitation = mongoose.model('ChallengeInvitation', {
    creator:{
        type:String,
    },
    relatedChallengeId: {
        type:String
    },
    invitee:{
        type:String,
    },
    challengeType:{
        type:String,
        default:'totalPoints',
        validate(challengeType){
            const challengeTypes = ['Sleep', 'Water', 'Clean Eating', 'Steps', 'totalPoints','Workout'];
            if (!challengeTypes.includes(challengeType)){
                throw Error(`challenge type ${challengeType} is not available `);
            }
        }
    },
    title: {
        type:String,
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
        default: new Date(),
    },
    status:{
        type:'String',
        default: 'pending',
        validate(status){
            const statusTypes = ['accepted', 'pending', 'rejected'];
            if (!statusTypes.includes(status)){
                throw Error('Status not correct type')
            }
        }
    }
})

module.exports = ChallengeInvitation;