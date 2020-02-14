const mongoose = require('mongoose')

const totalPointGoal = mongoose.model('totalPointGoal',{
    user:{
        type:String
    },
    goalStartDate:{
        type:Date,
        default: new Date(),
    },
    goalEndDate:{
        type: Date,
    },
    pointGoal:{
        type:Number,
        min:0,
        max:[10000000, 'be realistic' ]
    },
    goalCompleted: {
        type:Boolean,
        default:false,
    },
    pointsNeededToCompleteGoal:{
        type:Number,
        default:0,
    },
    currentPointTotal:{
        type:Number,
        min:0,
        max:[10000000, 'be realistic'],
    },
})

module.exports = totalPointGoal;
