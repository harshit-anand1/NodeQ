const Redis = require('ioredis');
const { v4 : uuidv4} = require('uuid');

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:379');

async function enqueue(job) {
    const jobId = uuidv4();
    const jobData = {
        id: jobId,
        type: job.type,
        payload: job.payload,
        status: 'queued',
        createdAt: Date.now()
    };

    //push to job queue
    await redis.rpush('job', JSON.stringify(jobData));

    //storing the metadata
    await redis.hset(`job:${jobId}`, jobData);

    return jobId;
}

module.exports = { enqueueJob, redis};