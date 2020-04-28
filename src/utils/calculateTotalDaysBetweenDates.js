/**
 * Calculate number of days between start date and end date.
 * 
 * @param {Date}    goalStartDate  Start date of goal
 * @param {Date}    goalEndDate    End date of goal
 * @return {Number}                Value of days from start date to end date
 */
const calculateTotalDaysBetweenDates = (goalStartDate, goalEndDate) => {
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds
  const differenceOfTimeInDays = Math.round(Math.abs((goalStartDate - goalEndDate) / oneDayInMilliseconds));
  return differenceOfTimeInDays;
};

module.exports = calculateTotalDaysBetweenDates;
