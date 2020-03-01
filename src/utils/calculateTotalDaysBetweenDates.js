
const calculateTotalDaysBetweenDates = (goalStartDate,goalEndDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const diffDays = Math.round(Math.abs((goalStartDate - goalEndDate) / oneDay));
    return diffDays
}

module.exports = calculateTotalDaysBetweenDates;