
require('./db/mongoose')

const express = require('express')
const userRouter = require('./routers/authentication.js/Users')
const activityInputRouter = require('./routers/activityInput')
const activityPointRouter = require('./routers/activityPoints')
const totalPointGoalRouter = require('./routers/totalPointGoal')
const challengeRouter = require('./routers/challenge')
const ChallengeInvitationRouter = require('./routers/challengeInvitation')

const app = express();
app.use(express.json());
app.use(activityInputRouter);
app.use(userRouter);
app.use(activityPointRouter);
app.use(totalPointGoalRouter);
app.use(challengeRouter);
app.use(ChallengeInvitationRouter);

app.get('/', (req, res) => {
    res.send('hello world')
})


module.exports = app