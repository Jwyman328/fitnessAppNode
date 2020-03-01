const mongoose = require("mongoose");
const calculateTotalDaysBetweenDates = require('../utils/calculateTotalDaysBetweenDates')

const totalPointGoalSchema = new mongoose.Schema( {
  user: {
    type: String
  },
  goalStartDate: {
    type: Date,
    default: new Date()
  },
  goalEndDate: {
    type: Date
  },
  dailyGoal: {
    type: Boolean,
    default: false
  },
  pointGoal: {
    type: Number,
    min: 0,
    max: [10000000, "be realistic"]
  },
  pointGoalTotal: {
    type: Number,
    min: 0,
    max: [1000000000, "be realistic"]
  },
  goalCompleted: {
    type: Boolean,
    default: false
  },
  pointsNeededToCompleteGoal: {
    type: Number,
    default: 0
  },
  currentPointTotal: {
    type: Number,
    min: 0,
    max: [10000000, "be realistic"]
  }
});

/**
 * Calculate total pointGoalTotal
 */
totalPointGoalSchema.pre("save", async function() {
  try {
    const totalPointGoal = this;
    if (totalPointGoal.dailyGoal) {
      // calculate number of days between date
      //totalPointGoal
      //const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
      //const diffDays = Math.round(Math.abs((totalPointGoal.goalStartDate - totalPointGoal.goalEndDate) / oneDay));
      const diffDays = calculateTotalDaysBetweenDates(totalPointGoal.goalStartDate,totalPointGoal.goalEndDate)
      totalPointGoal.pointGoalTotal = totalPointGoal.pointGoal * diffDays
    } else {
      totalPointGoal.pointGoalTotal = totalPointGoal.pointGoal;
    }
  } catch (error) {
    console.log(error);
  }
});

const totalPointGoal = mongoose.model("totalPointGoal", totalPointGoalSchema);
module.exports = totalPointGoal;
