const mongoose = require("mongoose");

const ActivityPoints = mongoose.model("ActivityPoint", {
  user: {
    type: String,
  },
  activityInput_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
    default: Date(),
  },
  sleepPoints: {
    type: Number,
    default: 0,
    min: 0,
    max: 100000,
  },
  workoutPoints: {
    type: Number,
    default: 0,
    min: 0,
  },
  waterPoints: {
    type: Number,
    min: 0,
    max: 10,
    default: 0,
  },
  cleanEatingPoints: {
    default: 0,
    type: Number,
    min: 0,
    max: 10,
  },
  stepPoints: {
    default: 0,
    type: Number,
    min: 0,
  },
  totalPoints: {
    type: Number,
    default: 0,
    min: 0,
  },
});

module.exports = ActivityPoints;
