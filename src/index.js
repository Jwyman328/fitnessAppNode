require('./db/mongoose')

const express = require('express')
const userRouter = require('./routers/Users')
const activityInputRouter = require('./routers/activityInput')
const app = express()
app.use(express.json())
app.use(activityInputRouter)
app.use(userRouter)
app.get('/', (req, res) => {
    res.send('hello world')
})


app.listen(3000,() => {
    console.log('listening on port 3000')
})