const express = require("express");
const auth = require("../middleware/auth");
const ActivityPoint = require("../models/activityPoints");
const activityPointRouter = new express.Router();
const CalculateTotalPointsFromActivityInputs = require("../utils/calculateTotalGoalPoints");

activityPointRouter.post("/activityPoint/", auth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const newActivityPoint = new ActivityPoint(req.body);
    const savedActivityPoint = await newActivityPoint.save();
    res.send(`activity point created ${savedActivityPoint}`);
  } catch (error) {
    console.log(error);
    res.send("error trying to create activity point");
  }
});

// find specific activity point by id
activityPointRouter.get("/activityPoint/:id/", auth, async (req, res) => {
  try {
    const specificActivityPoint = await ActivityPoint.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    //if activity point found.
    if (specificActivityPoint) {
      res.send(specificActivityPoint);
    } else {
      // if empty
      res.status(400);
      res.send("activity point not found");
    }
  } catch (error) {
    res.status(400);
    res.send("Error fetching activity point");
  }
});

//find all activity points for user
activityPointRouter.get("/allActivityPoints/mine/", auth, async (req, res) => {
  try {
    const allUserActivityPoints = await ActivityPoint.find({
      user: req.user._id,
    }).sort("-date");
    //if activity point found.
    if (allUserActivityPoints) {
      res.send(allUserActivityPoints);
    } else {
      // if empty
      res.send("activity points not found");
    }
  } catch (error) {
    res.status(400);
    res.send("Error fetching all activity point");
  }
});

//get point total for a goal with itrs start date and end date
// return total amount of points during these dates
activityPointRouter.get(
  "/goalPoints/:goalStartDate/:goalEndDate/",
  auth,
  async (req, res) => {
    try {
      const allPointInputs = await ActivityPoint.find({
        user: req.user._id,
        date: {
          $gte: new Date(req.params.goalStartDate).toISOString(),
          $lte: new Date(req.params.goalEndDate).toISOString(),
        },
      }).sort("date");
      // add up all total points totalPoints
      const totalPointForDateRange = CalculateTotalPointsFromActivityInputs(allPointInputs);

      res.send({ totalPointForDateRange: totalPointForDateRange });
    } catch (error) {
      res.status(404);
      res.send("error fetch goal activity points");
    }
  }
);

//get todays points
activityPointRouter.get("/todaysPoints/", auth, async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const todayActivityPoints = await ActivityPoint.find({
      user: req.user._id,
      date: today,
    });
    res.send(todayActivityPoints);
  } catch (error) {
    res.status(400);
    res.send("Error fetching all activity point");
  }
});

// get points for past month
activityPointRouter.get("/pastMonthPoints/", auth, async (req, res) => {
  try {
    const monthStart = new Date();
    monthStart.setMonth(monthStart.getMonth() - 1);

    const totalPointForDateRange = await ActivityPoint.find({
      user: req.user._id,
      date: { $gte: monthStart.toISOString(), $lte: new Date().toISOString() },
    }).sort("date");

    res.send(totalPointForDateRange);
  } catch (error) {
    res.status(404);
    res.send("error fetch goal activity points");
  }
});

module.exports = activityPointRouter;
