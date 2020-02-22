const {setUpUser, setUpActivityInput, setUpActivityPoints,cleanUpUsers,tearDownActivityInput, tearDownActivityPoints,setupDatabase,dropDB } = require('./utilities/setUp')
const activityInput = require('../models/activityInput')
const app = require('../app')
const request = require('supertest')
const activityPointData = require('./testData/activityPointData')
const userData = require('./testData/userData')
const { createUniqueId,
    makePostRequestWithToken,makeGetRequestWithToken} = require('./utilities/testHelpFunctions')

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
    activityPointData._id = createUniqueId()
    const response = await makePostRequestWithToken('/activityPoint/', userData.token,activityPointData);
    expect(response.status).toBe(200)
    expect(response.text).toContain('activity point created')
})


 test('should get activityPoint by id', async() => {
     //console.log(activityPointData, 'hiactivityPointData._i')
     const response = await makeGetRequestWithToken(`/activityPoint/${activityPointData._id}/`,userData.token)
     expect(response.status).toBe(200)
     expect(`${response.body._id}`).toBe(`${activityPointData._id}`)
 })




