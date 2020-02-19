const activityInput = require('../../models/activityInput')
const userData = require('../testData/userData')
const mongoose = require('mongoose')
const activityInputId = mongoose.Types.ObjectId()


const activityInputData = {
    date: "2020-02-18T20:25:02.000Z",
    _id: activityInputId,
    user: userData._id,
    hoursOfSleep: 4,
    water100Oz: true,
    cleanEating: true,
    workoutIntensity: 3,
    workoutTimeLength: 30,
    steps: 10000,
    
}

module.exports = activityInputData;