const app = require('../app')
const {setUpUser,cleanUpUsers,setUpInivitationChallenge, tearDownInvitationChallenge } = require('./utilities/setUp')
const ChallengeInvitation = require('../models/challengeInvitation')
const request = require('supertest')
const userData = require('./testData/userData')
const challengeInvitationData = require('./testData/challengeInvitationData')
const mongoose = require('mongoose')

/**
 * before each test create a user and a invitation challeng.
 */
beforeEach(async() => {
    await setUpUser()
    await setUpInivitationChallenge()
})

/**
 * After each test delete the used and invitation Challenge.
 */
afterEach(async() => {
    await cleanUpUsers()
    await tearDownInvitationChallenge()
})

/**
 * Create challenge invitation with post request.
 * Assert 200 status and correct invitation id.
 */
test('should create challenge invitation with post', async() => {
    //set unique _id different from beforeEach challengeInvitation id.
    challengeInvitationData._id = mongoose.Types.ObjectId().toHexString()
    const response = await request(app).post('/challengeInvitation/').set({'Authentication': userData.token}).send(challengeInvitationData)
    expect(response.status).toBe(200)
    expect(response.body._id).toEqual(challengeInvitationData._id)
})

/**
 * Get challengeInvitation by id created in beforeEach.
 * Assert 200 status code and same is as in beforeEach creation.
 */
test('should get invitation by id', async() => {
    const response = await request(app).get(`/challengeInvitation/${challengeInvitationData._id}/`).set({'Authentication': userData.token})
    expect(response.status).toBe(200)
    expect(response.body._id).toEqual(challengeInvitationData._id)
})

/**
 * Get all challenges with user as invitee.
 * Assert array returned with length of 1.
 * Assert challengeInvitation with correct Id.
 */
test('should get all user as invitee challenge invitations', async() => {
    const response = await request(app).get('/AllChallengeInvitation/myInvitations/').set({'Authentication': userData.token})
    expect(response.status).toBe(200)
    expect(response.text[0].length).toBe(1)
    expect(response.body[0]._id).toBe(challengeInvitationData._id)
})

/**
 * Get all challenges with user as the creator.
 * Assert array returned with length of 1.
 * Assert challengeInvitation with correct Id.
 */
test('should get all user as creator challenge invitations', async() => {
    const response = await request(app).get('/AllChallengeInvitationByCreator/mine/').set({'Authentication': userData.token})
    expect(response.status).toBe(200)
    expect(response.text[0].length).toBe(1)
    expect(response.body[0]._id).toBe(challengeInvitationData._id)
})

/**
 * Update a challngeInvitation status from pending to accepted.
 * Assert 200 status
 * Assert response contains accepted.
 */

 test('should update challenge from pending to accepted', async() => {
     const response = await request(app).patch(`/updateChallengeStatus/${challengeInvitationData._id}/`)
        .set({'Authentication': userData.token})
        .send({status:'accepted'})
    expect(response.status).toBe(200)
    expect(response.text).toContain('accepted')
 })