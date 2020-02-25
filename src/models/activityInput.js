const mongoose = require('mongoose')
const createActivityPointFromActivityInput = require('../utils/createActivityPointFromActivityInput')

const ActivityPoints = require('./activityPoints')
const ActivityInputSchema = new mongoose.Schema({
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

/**
 * Create a input point activity after activity input creatation
 */
ActivityInputSchema.post('save', async function(){
    console.log('this was hit')
    try{
        await createActivityPointFromActivityInput(this)
    }
    catch(error){
        console.log(error)
    }
})

const ActivityInput = mongoose.model('ActivityInput', ActivityInputSchema)


module.exports = ActivityInput;