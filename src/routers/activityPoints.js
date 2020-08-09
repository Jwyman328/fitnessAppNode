const express = require("express");
const auth = require("../middleware/auth");
const ActivityPoint = require("../models/activityPoints");
const activityPointRouter = new express.Router();
const CalculateTotalPointsFromActivityInputs = require("../utils/calculateTotalGoalPoints");
const getDateOneMonthFromToday = require('../utils/getDateOneMonthFromToday');
/**
 * Create a new activity point object.
 *
 * @return the newly created activity Point
 */
activityPointRouter.post("/", auth, async (req, res) => {
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

/**
 * Return an array of all activity point objects of the current user.
 */
activityPointRouter.get("/", auth, async (req, res) => {
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

/**
 * Return activityPoint object of current user for current date.
 */
activityPointRouter.get("/today/", auth, async (req, res) => {
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

/**
 * Return an array of all ActivityPoint objects from the past 30 days.
 */
activityPointRouter.get("/pastMonth/", auth, async (req, res) => {
  try {
    const oneMonthAgoFromToday = getDateOneMonthFromToday()
    
    const totalPointForDateRange = await ActivityPoint.find({
      user: req.user._id,
      date: { $gte: oneMonthAgoFromToday.toISOString(), $lte: new Date().toISOString() },
    }).sort("date");

    res.send(totalPointForDateRange);
  } catch (error) {
    res.status(404);
    res.send("error fetch goal activity points");
  }
});

/**
 * Return a specific activityPoint by id for the current user.
 */
activityPointRouter.get("/:id/", auth, async (req, res) => {
  try {
    const specificActivityPoint = await ActivityPoint.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (specificActivityPoint) {
      res.send(specificActivityPoint);
    } else {
      res.status(400);
      res.send("activity point not found");
    }
  } catch (error) {
    res.status(400);
    res.send("Error fetching activity point");
  }
});





module.exports = activityPointRouter;
