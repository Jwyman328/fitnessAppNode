const request = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Users = require('../models/Users')
const mongoose = require('mongoose')

const userOneId = mongoose.Types.ObjectId()
let userData = {
    _id: userOneId,
    email:'testEmail@gmail.com',
    password:'testPassword',
    totalPoints:0,
    token: jwt.sign({_id: userOneId.toHexString()}, 'secretcode')
}
let myUser;
beforeEach(async() => {
    await Users.deleteMany({})
    myUser = await new Users(userData).save()
    //console.log(await Users.findOne({token:userData.token}), 'hi')
})

test('Should sign up user', async() => {
    await request(app).post('/user/create/').send( // provide object of data 
        {
        email: 'footballjoe3281@gmail.com',
        password: 'testtest'}
    ).expect(200)
})

test('should get user profile', async () => {
    const res = await request(app).get('/user/profile/').set({'Authentication': userData.token})
    console.log((res.body))
    expect(res.body).toMatchObject({email:userData.email, totalPoints:userData.totalPoints})
})

