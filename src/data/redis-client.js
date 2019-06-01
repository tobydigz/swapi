const redis = require('redis');
const {
    promisify,
} = require('util');

const redisUrl = process.env.REDIS_URL || null;
const client = redis.createClient(
    {
        url: redisUrl,
    },
);

module.exports = {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
};
