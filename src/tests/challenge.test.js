const app = require('../app')
const {setUpUser,cleanUpUsers,setUpChallenge, tearDownChallenge } = require('./utilities/setUp')
const Challenge = require('../models/challenge')
const request = require('supertest')
const userData = require('./testData/userData')
const challengeData = require('./testData/challengeData')
const mongoose = require('mongoose')

beforeEach( async() => {
    await setUpUser();
    await setUpChallenge()
})

afterEach( async() => {
    await cleanUpUsers()
    await tearDownChallenge()
})
/**
 * Create a challenge with a post request.
 * Assert that challenge is sent back with correct challenge id
 */
test('should create challenge on post', async() => {
    //set a unique id different from one created in beforeEach
    challengeData._id = mongoose.Types.ObjectId()
    const response = await request(app).post('/challenge/').set({'Authentication': userData.token}).send(challengeData)
    expect(response.status).toBe(200)
    expect(response.text).toContain(challengeData._id.toHexString())
})

/**
 * Get challenge by get request with id.
 * Assert challenge object returned contains same _id as create on beforeEach.
 */
test('should get challenge by id', async() => {
    const response = await request(app).get(`/challenge/${challengeData._id}/`).set({'Authentication': userData.token});
    console.log(response.body)
    expect(response.body._id).toContain(challengeData._id)
})

/**
 * Get all challenges by user token.
 * Assert an array of length one is returned.
 * Assert the array contains the same challenge _id as created on beforeEach
 */
test('should get all challenges by user', async() => {
    const response = await request(app).get('/allChallenges/').set({'Authentication': userData.token});
    expect(response.body.length).toBe(1)
    expect(response.body[0]._id).toContain(challengeData._id)

})