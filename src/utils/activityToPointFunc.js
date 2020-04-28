/**
 * Convert hours slept into a point value.
 *
 * @param {Number} hours    hours of sleep
 * @return {Number}         point value for hours of sleep
 */
const sleepTimeToPoints = (hours) => {
  return hours * 3.3;
};

/**
 * Convert boolean of whether user ate clean or not into a point value.
 *
 * @param {Boolean} didCleanEating  whether the user ate clean or not
 * @return {Number}                 point value of didCleanEating
 */
const cleanEatingToPoints = (didCleanEating) => {
  if (didCleanEating) {
    return 10;
  } else {
    return 0;
  }
};

/**
 * Convert workoutIntensity and workoutTime into a workout point value.
 *
 * @param {Number} workoutIntensity value 1-4 representing workout intensity
 * @param {Number} workoutTime      value in hours representing workout time
 * @return {Number}                 workout point value
 */
const workoutInputToPoints = (workoutIntensity, workoutTime) => {
  return workoutIntensity * (workoutTime * 0.2);
};

/**
 * Convert if 100oz of water was drank into a point value.
 *
 * @param {Boolean} didDrank100OzWater  whether 100oz of water was drank
 * @return {Number}                     Point value of if 100 oz of water was drank
 */
const waterOzToPoints = (didDrank100OzWater) => {
  if (didDrank100OzWater) {
    return 10;
  } else {
    return 0;
  }
};

/**
 * Convert steps taken into point value.
 *
 * @param {Number} stepCount    steps taken
 * @return {Number}             steps taken in point value
 */
const stepsToPoints = (stepCount) => {
  return stepCount * 0.001;
};

module.exports = {
  sleepTimeToPoints,
  cleanEatingToPoints,
  workoutInputToPoints,
  waterOzToPoints,
  stepsToPoints,
};
