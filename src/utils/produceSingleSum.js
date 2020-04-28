/**
 * Produce a sum value from the array of numbers.
 * 
 * @param {Array} arrayOfNumbers    Array of numbers
 * @return {Number}                 A sum of the array of numbers.
 */
const produceSingleSum = (arrayOfNumbers) => arr.reduce((a, b) => a + b, 0);

module.exports = produceSingleSum;
