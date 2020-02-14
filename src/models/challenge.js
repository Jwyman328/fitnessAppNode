const mongoose = require('mongoose');

const Challenge = mongoose.model('challenge', {
    creator:{
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
    participants: {
        type:Array,
        default:[],
    },
    invitees: {
        type:Array,
        default:[],
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date,
    },
})

module.exports = Challenge;