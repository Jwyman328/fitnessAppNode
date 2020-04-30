const ActivityPoints = require("../models/activityPoints");

const {
  sleepTimeToPoints,
  cleanEatingToPoints,
  workoutInputToPoints,
  waterOzToPoints,
  stepsToPoints,
} = require("./activityToPointHelperFunctions");

const { produceSingleSum } = require("./produceSingleSum");

/**
 * Create an activityPoint object from an activityInput object.
 *
 * All inputs are in specific measurement values,
 * sleep in hours
 * steps in step count
 * eating healthy in boolean.
 * etc.
 *
 * They must all be converted into a numeric point value.
 *
 * @param {Object} activityInput  ActivityInput object with activity specific measurement values.
 * @return {Object}               ActivityPoints object with point value for each activity.
 */

async function createActivityPointFromActivityInput(activityInput) {
  const sleepPoints = sleepTimeToPoints(activityInput.hoursOfSleep);
  const workoutPoints = workoutInputToPoints(
    activityInput.workoutIntensity,
    activityInput.workoutTimeLength
  );
  const waterPoints = waterOzToPoints(activityInput.water100Oz);
  const cleanEatingPoints = cleanEatingToPoints(activityInput.cleanEating);
  const stepPoints = stepsToPoints(activityInput.steps);

  const sumPointTotalForAllActivities = produceSingleSum([
    sleepPoints,
    workoutPoints,
    waterPoints,
    cleanEatingPoints,
    stepPoints,
  ]);

  await ActivityPoints({
    user: activityInput.user,
    activityInput_id: activityInput._id,
    date: activityInput.date,
    sleepPoints: sleepPoints,
    workoutPoints: workoutPoints,
    waterPoints: waterPoints,
    cleanEatingPoints: cleanEatingPoints,
    stepPoints: stepPoints,
    totalPoints: sumPointTotalForAllActivities,
  }).save();
}

module.exports = {createActivityPointFromActivityInput};
