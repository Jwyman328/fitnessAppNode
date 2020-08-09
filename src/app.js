require("./db/mongoose");
var compression = require("compression");

const helmet = require("helmet");

const express = require("express");
const userRouter = require("./routers/authentication.js/Users");
const activityInputRouter = require("./routers/activityInput");
const activityPointRouter = require("./routers/activityPoints");
const totalPointGoalRouter = require("./routers/totalPointGoal");
const challengeRouter = require("./routers/challenge");
const ChallengeInvitationRouter = require("./routers/challengeInvitation");
var cors = require("cors");

const app = express();
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(express.json());
app.use('/activityInputs/',activityInputRouter);
app.use(userRouter);
app.use('/activityPoints/',activityPointRouter);
app.use(totalPointGoalRouter);
app.use('challenges',challengeRouter);
app.use(ChallengeInvitationRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});

/**
 * Return sum of total points for a range of dates.
 *
 * Return Example:
 * { totalPointForDateRange: 75 }
 */
app.get(
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

module.exports = app;
