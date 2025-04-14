const { default: Redis } = require("ioredis");

const redis = new Redis(process.env.REDIS_URI)

redis.on('error', (err) => {
    console.error('ERROR CONNECTED REDIS : ', err);
});

redis.on('connect', () => {
    console.log(' CONNECTED REDIS ');
});

module.exports = redis;


module.exports = redis;