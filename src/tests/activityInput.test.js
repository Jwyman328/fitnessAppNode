const {setUpUser, setUpActivityInput, setUpActivityPoints,cleanUpUsers, tearDownActivityInput,tearDownActivityPoints} = require('./utilities/setUp')
const activityInput = require('../models/activityInput')
const app = require('../app')
const request = require('supertest')
const userData = require('./testData/userData')
const activityInputData = require('./testData/activityInput')
const mongoose = require('mongoose')
const activityIdTwo = mongoose.Types.ObjectId()

/**
 * Create a user and activityInput.
 * A user will be needed for Authentication of an active token.
 * ActivityInput will be needed to fetch from endpoints.
 */
beforeEach(async() => {
    await setUpUser()
    await setUpActivityInput()
    await setUpActivityPoints()

})

afterEach( async() => {
    await cleanUpUsers()
    await tearDownActivityInput()
    await tearDownActivityPoints()
})

// create activity input /activityInput/
test('Should create activity input', async() => {
    // alter data Id so no duplication id error 
    activityInputData._id = activityIdTwo;
    const response = await request(app).post('/activityInput/').set({'Authentication': userData.token})
        .send(activityInputData)
    //expect correct status
    expect(response.status).toBe(200)
    //expect inputActivity created message 
    expect(response.text).toBe('new activity input created')
})

//get user activityInput by id /activityInput/:id/
test('should get user activity input by id', async() => {
    const response = await request(app).get(`/activityInput/${activityInputData._id}/`).set({'Authentication': userData.token});
    expect(response.body._id).toBe(activityInputData._id.toHexString())
})

//get array of all user's activtyInput
test('should get all user activityInput', async() => {
    console.log(userData.token, 'tok')
    const response = await request(app).get('/allActivityInputs/').set({'Authentication': userData.token});
    expect(response.body[0]._id).toBe(activityInputData._id.toHexString())
})



 
