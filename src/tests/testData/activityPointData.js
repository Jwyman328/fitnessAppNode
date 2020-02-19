const user = require('./userData')
const mongoose = require('mongoose')
const activityPointId = mongoose.Types.ObjectId()

const myActivityPoint = {
    _id : activityPointId,
    user: user._id,
    date: "2020-02-18T20:25:02.000Z",
    sleepPoints: 10,
    workoutPoints: 100,
    waterPoints: 10,
    cleanEatingPoints: 10,
    stepPoints:200,
    totalPoints: 330
}

module.exports = myActivityPoint;