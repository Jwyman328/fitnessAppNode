/**
 * Create the sum total of all totalPoints from an array of activity point input objects.
 * 
 * @param {Array} allActivityInputsForRangeOfDates  Array of activity point input objects containing a totalPoint.
 * @return {Number}                                 A sum total of all total points for each activity point input object.
 */
const CalculateTotalPointsFromActivityInputs = (allActivityInputsForRangeOfDates) => {
  const allTotalPointInputsForRangeOfDates = allActivityInputsForRangeOfDates.map(
    (activityInput) => activityInput.totalPoints
  );
  const totalPointsAccumulatedForDateRange = allTotalPointInputsForRangeOfDates.reduce((a, b) => a + b, 0);
  return totalPointsAccumulatedForDateRange;
};

module.exports = CalculateTotalPointsFromActivityInputs;
