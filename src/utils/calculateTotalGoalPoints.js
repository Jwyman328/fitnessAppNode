/**
 * Add together all totalPoints from an array of activity point objects.
 * @param {Array} allGoalInputs - Array of activity point object containing a totalPoint.
 */
const CalculateTotalGoalPoints = (allPointInputs) => {
    const totalPoints = allPointInputs.map(activityPoint =>  activityPoint.totalPoints)
    const totalPointForDateRange = totalPoints.reduce((a, b) => a + b, 0)
    return totalPointForDateRange
}

module.exports = CalculateTotalGoalPoints;