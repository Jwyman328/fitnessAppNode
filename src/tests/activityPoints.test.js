const {setUpUser, setUpActivityInput, setUpActivityPoints,cleanUpUsers,tearDownActivityInput, tearDownActivityPoints,setupDatabase,dropDB } = require('./utilities/setUp')
const activityInput = require('../models/activityInput')
const app = require('../app')
const request = require('supertest')
const activityPointData = require('./testData/activityPointData')
const userData = require('./testData/userData')
const mongoose = require('mongoose')
const activityIdTwo = mongoose.Types.ObjectId()

// make a setUpActivityPoints 
beforeEach( async() => {
    await setUpUser()
    await setUpActivityInput()
    await setUpActivityPoints()

})

afterEach(async() => {
    await cleanUpUsers()
    await tearDownActivityInput()
    await tearDownActivityPoints()
})

/**
 * Create activitypoint with post, recieve created text from response.
 */
test('should create activityPoint', async()  => {
    activityPointData._id = mongoose.Types.ObjectId()
    const response = await request(app).post('/activityPoint/').set({'Authentication': userData.token}).send(activityPointData);
    expect(response.status).toBe(200)
    expect(response.text).toContain('activity point created')
})

/**
 * Get activityPoint by id
 */

 test('should get activityPoint by id', async() => {
     //console.log(activityPointData, 'hiactivityPointData._i')
     const response = await request(app).get(`/activityPoint/${activityPointData._id}/`).set({'Authentication': userData.token})
     console.log(activityPointData._id,'responsesir')
     expect(response.status).toBe(200)
     console.log(response.body._id,activityPointData._id, 'resy')
     expect(`${response.body._id}`).toBe(`${activityPointData._id}`)
 })




