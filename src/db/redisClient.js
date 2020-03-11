
const redis = require('redis')
const bluebird = require('bluebird') 
bluebird.promisifyAll(redis)
const redisClient = redis.createClient("redis://redis:6379")

module.exports = {redisClient}