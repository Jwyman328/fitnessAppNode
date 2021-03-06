const redisUri = process.env.REDISTOGO_URL || "redis://redis:6379";

const redis = require("redis");
const bluebird = require("bluebird");
bluebird.promisifyAll(redis);
const redisClient = redis.createClient(redisUri);

module.exports = { redisClient };
