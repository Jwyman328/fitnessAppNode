const ActivityPoints = require('../models/activityPoints')
const {sleepTimeToPoints,cleanEatingToPoints,workoutInputToPoints, waterOzToPoints, stepsToPoints  } = require('./activityToPointFunc')

/**
 * Create a activityPoint object from an activityInput object.
 * 
 * @param {Object} activityInput -- ActivityInput object
 */

async function createActivityPointFromActivityInput(activityInput){
    const sleepPoints = sleepTimeToPoints(activityInput.hoursOfSleep);
    const workoutPoints = workoutInputToPoints(activityInput.workoutIntensity,activityInput.workoutTimeLength);
    const waterPoints = waterOzToPoints(activityInput.water100Oz);
    const cleanEatingPoints = cleanEatingToPoints(activityInput.cleanEating)
    const stepPoints = stepsToPoints(activityInput.steps)

    const sumArray = arr => arr.reduce((a,b) => a + b, 0)
    const totalPoints = sumArray([sleepPoints,workoutPoints,waterPoints,cleanEatingPoints,stepPoints])
    
    await ActivityPoints({user:activityInput.user, activityInput_id: activityInput._id, date:activityInput.date, sleepPoints:sleepPoints,
        workoutPoints:workoutPoints, waterPoints:waterPoints, cleanEatingPoints:cleanEatingPoints,
        stepPoints:stepPoints,totalPoints:totalPoints
       }).save()
}

module.exports = createActivityPointFromActivityInput;