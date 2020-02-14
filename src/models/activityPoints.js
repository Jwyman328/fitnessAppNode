const mongoose = require('mongoose');

const ActivityPoints = mongoose.model('ActivityPoint',{
    user:{
        type:String,
    },
    date: {
        type:Date,
        required:true,
        default: Date(),
    },
    sleepPoints : {
        type:Number,
        default:0,
        min:0,
        max:10,
    },
    waterPoints: {
        type:Number,
        min:0,
        max:10,
        default:0,
    },
    cleanEatingPoints:{
        type:Number,
        min:0,
        max:10,
    },
    totalPoints: {
        type: Number,
        default:0,
        min:0,
    },
    

})