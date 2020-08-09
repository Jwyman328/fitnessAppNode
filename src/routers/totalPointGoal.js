const express = require("express");
const auth = require("../middleware/auth");
const TotalPointGoal = require("../models/totalPointGoal");
const totalPointGoalRouter = new express.Router();
const ActivityPoint = require("../models/activityPoints");
const CalculateTotalPointsFromActivityInputs = require("../utils/calculateTotalGoalPoints");

/**
 * Return sum of total points for a range of dates.
 *
 * Return Example:
 * { totalPointForDateRange: 75 }
 */
totalPointGoalRouter.get(
  "/goalPoints/:goalStartDate/:goalEndDate/",
  auth,
  async (req, res) => {
    try {
      const allPointInputsForDateRange = await ActivityPoint.find({
        user: req.user._id,
        date: {
          $gte: new Date(req.params.goalStartDate).toISOString(),
          $lte: new Date(req.params.goalEndDate).toISOString(),
        },
      }).sort("date");
      const totalPointForDateRange = CalculateTotalPointsFromActivityInputs(
        allPointInputsForDateRange
      );

      res.send({ totalPointForDateRange: totalPointForDateRange });
    } catch (error) {
      res.status(404);
      res.send("error fetch goal activity points");
    }
  }
);


/**
 * Create a new totalPointGoal.
 * 
 * @return Success message that totalPointGoal was created
 */
totalPointGoalRouter.post("/", auth, async (req, res) => {
  try {
    req.body.user = req.user._id;
    const newTotalPointGoal = await new TotalPointGoal(req.body);
    const savedTotalPointGoal = await newTotalPointGoal.save();
    res.send(`new total point goal created ${savedTotalPointGoal}`);
  } catch {
    res.status(400);
    res.send("error creating total point goal");
  }
});


/**
 * Delete a totalPointGoal for the current user by id.
 * 
 * @return success message of deletion.
 */
totalPointGoalRouter.delete("/:id/", auth, async (req, res) => {
  try {
    const totalPointGoalDelete = await TotalPointGoal.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (totalPointGoalDelete) {
      res.send(`goal deleted successfully`);
    } else {
      res.send(`could not delete total point goal with ${totalPointGoal}`);
    }
  } catch (error) {
    res.status(400);
    res.send(`error deleting point goal with id ${req.params.id}`);
  }
});

/**
 * Return an array of all totalPointGoals for the current user.
 */
totalPointGoalRouter.get("/", auth, async (req, res) => {
  try {
    const allPointGoals = await TotalPointGoal.find({ user: req.user._id });
    res.send(allPointGoals);
  } catch (error) {
    res.status(400);
    res.send("error getting user point goals");
  }
});

/**
 * Return an array of all current totalPointGoals for the current user.
 */
totalPointGoalRouter.get("/currentGoals/", auth, async (req, res) => {
  try {
    const currentGoals = await TotalPointGoal.find({
      user: req.user._id,
      goalStartDate: { $lte: new Date().toISOString() },
      goalEndDate: { $gte: new Date().toISOString() },
    }).sort("goalEndDate");
    res.send(currentGoals);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Return an array of all future totalPointGoals for the current user.
 */
totalPointGoalRouter.get("/futureGoals/", auth, async (req, res) => {
  try {
    const currentGoals = await TotalPointGoal.find({
      user: req.user._id,
      goalStartDate: { $gte: new Date().toISOString() },
      goalEndDate: { $gte: new Date().toISOString() },
    }).sort("goalEndDate");
    res.send(currentGoals);
  } catch (error) {
    res.send(error);
  }
});


/**
 * Return an array of all past totalPointGoals for the current user.
 */
totalPointGoalRouter.get("/pastGoals/", auth, async (req, res) => {
  try {
    const pastGoals = await TotalPointGoal.find({
      user: req.user._id,
      goalEndDate: { $lte: new Date().toISOString() },
    }).sort("-goalEndDate");
    res.send(pastGoals);
  } catch (error) {
    res.send(error);
  }
});

/**
 * Return totalPointGoal for the current user by id.
 */
totalPointGoalRouter.get("/:id/", auth, async (req, res) => {
  try {
    const totalPointGoal = await TotalPointGoal.findOne({
      _id: req.params.id,
      user: req.user._id,
    });
    if (totalPointGoal) {
      res.send(totalPointGoal);
    } else {
      res.send(`could not get total point goal with ${totalPointGoal}`);
    }
  } catch (error) {
    res.status(400);
    res.send(`error getting point goal with id ${req.params.id}`);
  }
});


module.exports = totalPointGoalRouter;
