/**
 * Return a date object one month from today's current date.
 */
function getDateOneMonthFromToday() {
  const monthStart = new Date();
  monthStart.setMonth(monthStart.getMonth() - 1);
  return monthStart;
}

module.exports = getDateOneMonthFromToday;
