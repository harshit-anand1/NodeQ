const {redis} = require('../queue');

const MAX_RETRIES = 3;

async function processJob(jobData) {
    
    const jobKey = `job:${jobData.id}`;

    console.log('Processing Job:', jobData.id);

    //1. Update Status to 'processing'
    await redis.hset(`job:${jobData.id}`, 'status', 'processing');

    const success = Math.random()>0.4;

try{
    //2. Simulate work woth setTimeout or delay
    await new Promise((resolve) => setTimeout(resolve,2000));

    if(!success){
        throw new Error("Random simulated failure");
    }

    //3. Update status to 'completed if job succeeds'
    await redis.hset(jobKey, 'status', 'completed');

    console.log('Job Completed: ', jobData.id);
    }
    catch (err){
        console.log('Job Failed', jobData.id);
    }


    //Increment retryCount

    let retryCount = parseInt(await redis.hget(jobKey, 'retries') || '0');
    retryCount++;

    await redis.hset(jobKey, 'retries', retryCount);

    if(retryCount < MAX_RETRIES){
        console.log(`Retrying ${retryCount}/${MAX_RETRIES} ....`);
        await redis.rpush('job', JSON.stringify(jobData));

    }
    else {
        await redis.hset(jobKey, 'status', 'failed');
        console.log('`Max Retries exhausted for job ${jobData.id}. End of attempts');
    }

}

async function startWorker(){
    console.log('Worker started...');

    while(true){
        const jobRaw = await redis.lpop('job');
        if(!jobRaw) {
            await new Promise(r => setTimeout(r,1000));
            continue;
        }

        const job = JSON.parse(jobRaw);
        await processJob(job);
    }
}

startWorker();