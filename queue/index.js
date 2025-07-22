const Redis = require('ioredis');
const { v4 : uuidv4} = require('uuid');

const redis = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

async function fetchStatus(jobId){
    return await redis.hgetall(`job:${jobId}`);
}


async function enqueue(job) {
    const jobId = uuidv4();
    const jobData = {
        id: jobId,
        type: job.type,
        payload: job.payload,
        status: 'queued',
        createdAt: Date.now(),
        priority: job.priority
    };

    //push to job queue
   if(job.priority==='high'){   
    await redis.lpush('job', JSON.stringify(jobData));
   }
   else{
    await redis.rpush('job', JSON.stringify(jobData));

   }
    //storing the metadata
    await redis.hset(`job:${jobId}`, Object.entries(jobData).flat());

    console.log('Enqueue job:', jobData);
    return jobId;
}

module.exports = { enqueue, redis, fetchStatus};