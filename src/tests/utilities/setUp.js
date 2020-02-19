//models
const Users = require('../../models/Users')
const ActivityInput = require('../../models/activityInput')
const ActivityPoint = require('../../models/activityPoints')
const Challenge = require('../../models/challenge')
const ChallengeInvitation = require('../../models/challengeInvitation')

// mock data 
const challengeData = require('../testData/challengeData')
let userData = require('../testData/userData')
const activityData = require('../testData/activityInput')
const myActivityPointData = require('../testData/activityPointData')
const challengeInvitationData = require('../testData/challengeInvitationData')

const mongoose = require('mongoose')

const setUpUser = async() => {
    await Users.deleteMany({}) //clear database
    await new Users(userData).save()
    const all_users_af = await Users.find({})
    //console.log(all_users_af, 'starting users')
}

const cleanUpUsers = async() => {
    await Users.deleteMany({}) //clear database
    const all_users = await Users.find({})
    //console.log(all_users, 'ending users')

}

const setUpActivityInput = async() => {
    await ActivityInput.deleteMany({}); //clear database
    const allActivityPoint = await ActivityPoint.find({}) 
    //console.log(allActivityPoint , 'starting activity input')
    await new ActivityInput(activityData).save();
}

const tearDownActivityInput = async() => {
    await ActivityInput.deleteMany({}); //clear database
    const all_inputs = await ActivityInput.find({})
    //console.log(all_inputs, 'ending activity input')

}

const setUpActivityPoints = async() => {
    await ActivityPoint.deleteMany({}) //clear database
    await new ActivityPoint(myActivityPointData).save()
    const all_activityPoint = await ActivityPoint.find({})
    //console.log('starting activity point',all_activityPoint)
}

const tearDownActivityPoints = async() => {
    await ActivityPoint.deleteMany({})
    const all_activityPoint = await ActivityPoint.find({})
    //console.log(all_activityPoint, 'ending activity points')
}

const setUpChallenge = async() => {
    await new Challenge(challengeData).save()
}

const tearDownChallenge = async() => {
    await Challenge.deleteMany({})
}

const setUpInivitationChallenge = async() => {
     await new ChallengeInvitation(challengeInvitationData).save()
    
}

const tearDownInvitationChallenge = async() => {
    await ChallengeInvitation.deleteMany({})
}

module.exports = {setUpUser,setUpActivityInput, setUpActivityPoints,cleanUpUsers, tearDownActivityInput, 
    tearDownActivityPoints, setUpChallenge, tearDownChallenge,setUpInivitationChallenge, tearDownInvitationChallenge};
