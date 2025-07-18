const Redis = require('ioredis');
const { v4 : uuidv4} = require('uuid');

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:379');
