const request = require('supertest')
const app = require('../app')
const Users = require('../models/Users')
const {setUpUser, setUpActivityInput, setUpActivityPoints,cleanUpUsers, 
    tearDownActivityInput,tearDownActivityPoints } = require('./utilities/setUp')
let userData = require('../tests/testData/userData')
const { makePostRequestWithoutToken,makeGetRequestWithToken} = require('./utilities/testHelpFunctions')
let myUser;

/**
 * Clear database of users before each test.
 */
beforeEach(async() => {
    await setUpUser()

}
    )

afterEach(async() => {
    await cleanUpUsers()
    await tearDownActivityInput()
    await tearDownActivityPoints()
})

/**
 * Sign up a new user successfully.
 */
test('Should sign up user', async() => {
   const response =  await makePostRequestWithoutToken('/user/create/',
        {email: 'footballjoe3281@gmail.com',password: 'testtest'});
   expect(response.status).toBe(200)
})


/**
 * log in a previously created user and recieve a token.
 */
test('Should log in user and recieve a token', async() => {
    const response = await makePostRequestWithoutToken('/user/login',{data:{email:userData.email,password:userData.password}})
    expect(response.status).toBe(200);
    expect(response.body.token).not.toBe(null);
})

/**
 * password in database is hashed and not a string like the password entered on creation.
 */
test('Should have hashed password in database', async () => {
    const user = await Users.findById(userData._id);
    expect(user.password).not.toEqual(userData.password);
})

/**
 * Get back user object with only email and totalPoints when requesting profile data.
 * 
 * We want password and token data to not be sent back to the user.
 */
test('should get user profile', async () => {
    const res = await makeGetRequestWithToken('/user/profile/',userData.token)
    expect(res.body).toMatchObject({email:userData.email, totalPoints:userData.totalPoints})
})

