const app = require('../app')
const {setUpUser,cleanUpUsers,setUpChallenge, tearDownChallenge } = require('./utilities/setUp')
const Challenge = require('../models/challenge')
const ChallengeInvitation = require('../models/challengeInvitation')
const request = require('supertest')
const userData = require('./testData/userData')
const challengeData = require('./testData/challengeData')
const { createUniqueId,
    makePostRequestWithToken,makeGetRequestWithToken} = require('./utilities/testHelpFunctions')

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
    challengeData._id = createUniqueId()
    const response = await makePostRequestWithToken('/challenge/', userData.token,challengeData)
    expect(response.status).toBe(200)
    expect(response.text).toContain(challengeData._id.toHexString())
})

test('challenge invitation should be created on challenge creation', async() => {
    challengeData._id = createUniqueId()
    const response = await makePostRequestWithToken('/challenge/', userData.token,challengeData)
    const relatedChallengeInvitation = await ChallengeInvitation.findOne({relatedChallengeId:challengeData._id })
    expect(relatedChallengeInvitation.title).toBe(challengeData.title)

})

/**
 * Get challenge by get request with id.
 * Assert challenge object returned contains same _id as create on beforeEach.
 */
test('should get challenge by id', async() => {
    const response = await makeGetRequestWithToken(`/challenge/${challengeData._id}/`,userData.token);
    expect(response.body._id).toContain(challengeData._id)
})

/**
 * Get all challenges by user token.
 * Assert an array of length one is returned.
 * Assert the array contains the same challenge _id as created on beforeEach
 */
test('should get all challenges by user', async() => {
    const response = await makeGetRequestWithToken('/allChallenges/',userData.token);
    expect(response.body.length).toBe(1)
    expect(response.body[0]._id).toContain(challengeData._id)
})

