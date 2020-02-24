
const sleepTimeToPoints = (hours) => {
    return hours * 3.3
}

const cleanEatingToPoints = (didCleanEating) => {
    if (didCleanEating){
        return 10
    } else {
        return 0
    }
}

const workoutInputToPoints = (workoutIntensity, workoutTime) => {
    return workoutIntensity * (workoutTime * .2)
}

const waterOzToPoints = (didDrank100Oz) => {
    if (didDrank100Oz){
        return 10
    } else {
        return 0
    }
}

const stepsToPoints = (stepCount) => {
    return stepCount * .001
}

module.exports = {sleepTimeToPoints,cleanEatingToPoints,workoutInputToPoints, waterOzToPoints, stepsToPoints  }