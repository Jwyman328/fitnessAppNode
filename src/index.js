require('./db/mongoose')

const express = require('express')
const userRouter = require('./routers/Users')
const activityInputRouter = require('./routers/activityInput')
const activityPointRouter = require('./routers/activityPoints')
const totalPointGoalRouter = require('./routers/totalPointGoal')
const challengeRouter = require('./routers/challenge')

const app = express();
app.use(express.json());
app.use(activityInputRouter);
app.use(userRouter);
app.use(activityPointRouter);
app.use(totalPointGoalRouter);
app.use(challengeRouter);


app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(3000,() => {
    console.log('listening on port 3000')
})