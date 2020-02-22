const mongoose = require('mongoose')
const app = require('../../app')
const request = require('supertest')

/**
 * Add Bearer to jwt token.
 * @param {string} token -- jwt token.
 */
const addBearerToToken = (token) => {
   return `Bearer ${token}`
}

/**
 * Return a new mongoose id
 */
const createUniqueId = () =>{
    return(mongoose.Types.ObjectId())
}

/**
 * Make a post request with token Authorization.
 * Return response.
 * 
 * @param {String} url -- url destination of request.
 * @param {String} token -- jwt token of the user.
 * @param {*} postData -- data to be posted.
 */
const makePostRequestWithToken = async (url,token,postData) => {
    const bearerToken = addBearerToToken(token)
    const response = await request(app).post(url).set({'Authorization': bearerToken}).send(postData);
    return response
}
const makePostRequestWithoutToken = async (url,postData) => {
    const response = await request(app).post(url).send(postData);
    return response
}

/**
 * Make a get request with token Authorization.
 * Return response.
 * 
 * @param {String} url -- url destination of request.
 * @param {String} token -- jwt token of the user.
 */
const makeGetRequestWithToken = async (url,token) => {
    const bearerToken = addBearerToToken(token)
    const response = await request(app).get(url).set({'Authorization': bearerToken});
    return response
}

const makeGetRequestWithoutToken = async (url) => {
    const bearerToken = addBearerToToken(token)
    const response = await request(app).get(url);
    return response
}


/**
 * Make a patch request with token Authorization.
 * Return response.
 * 
 * @param {*} url -- url destination of request.
 * @param {*} token -- jwt token for request
 * @param {*} patchData -- data to update model.
 */
const makePatchRequestWithToken =  async (url,token, patchData) => {
    const bearerToken = addBearerToToken(token)
    const response = await request(app).patch(url).set({'Authorization': bearerToken}).send(patchData);
    return response
}
module.exports = {addBearerToToken,createUniqueId,makePostRequestWithToken,makeGetRequestWithToken,
    makePatchRequestWithToken,makePostRequestWithoutToken,makeGetRequestWithoutToken };