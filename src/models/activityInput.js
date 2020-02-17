const mongoose = require('mongoose')

const ActivityInput = mongoose.model('ActivityInput',{
    user: {
        type:String,
        required:true,
    },
    date: {
        default: Date() , //default date as creation date
        type:Date,  
        required:true,
           
    },
    hoursOfSleep: {
        type:Number,
        default:0,
        required:true,
        validate(hoursOfSleep){
            if (hoursOfSleep < 0){
                throw Error('Hours of sleep can not be negative')
            }
        }
    },
    water100Oz: {
        type: Boolean,
        default:false,
        required:true,

    },
    cleanEating: {
        type:Boolean,
        default:false,
        required:true,

    },
    workoutIntensity: {
        type:Number,
        default:0,
        min: [0, 'can not be negative'],
        max: [4,'can not exceed 4'],
    },
    workoutTimeLength: { //time in minutes
        type:Number,
        default:0,
        min: 0,
        max:[1000,'seriously thats too long']
    },
    steps:{
        type:Number,
        min:0,
        default:0,
        max: [70000, 'that would be a lie'],
        required:true,
    }

})

module.exports = ActivityInput;