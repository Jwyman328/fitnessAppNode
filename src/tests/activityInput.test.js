const {setUpUser, setUpActivityInput, setUpActivityPoints,cleanUpUsers, tearDownActivityInput,tearDownActivityPoints} = require('./utilities/setUp')
const activityInput = require('../models/activityInput')
const app = require('../app')
const request = require('supertest')
const userData = require('./testData/userData')
const activityInputData = require('./testData/activityInput')
const {createUniqueId,
    makePostRequestWithToken,makeGetRequestWithToken} = require('./utilities/testHelpFunctions')

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
    activityInputData._id = createUniqueId();
    const response = await makePostRequestWithToken('/activityInput/',userData.token,activityInputData)
    //const response = await request(app).post('/activityInput/').set({'Authorization': userData.token})
       // .send(activityInputData)
    expect(response.status).toBe(200)
    expect(response.text).toBe('new activity input created')
})

//get user activityInput by id /activityInput/:id/
test('should get user activity input by id', async() => {
    const response = await makeGetRequestWithToken(`/activityInput/${activityInputData._id}/`,userData.token)
    expect(response.body._id).toBe(activityInputData._id.toHexString())
})

//get array of all user's activtyInput
test('should get all user activityInput', async() => {
    const response = await makeGetRequestWithToken('/allActivityInputs/', userData.token);
    expect(response.body[0]._id).toBe(activityInputData._id.toHexString())
})



 
