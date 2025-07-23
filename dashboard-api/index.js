const { redis } = require('../queue');
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());

app.get('/jobs', async (req,res)=>{
    try{
        const keys = await redis.keys('job:*');
        const jobs =[];

        for (const key of keys){
            const job = await redis.hgetall(key);
            jobs.push(job);
        }

        res.json(jobs);
    } catch (err){
        console.error('Error fetching jobs:', err);
        res.status(500).json({error: 'Failed to fetch jobs'});
    }
});

app.get('/job/:id', async (req,res)=>{
    const jobId = req.params.id;
    try{
        const job= await redis.hgetall(`job:${jobId}`);

        if(Object.keys(job).length===0){
            return res.status(404).json({error: 'Job Not Found'});
        }
        res.json(job);
    } catch(err){
        console.error('Erro fetching job:', err);
        res.status(500).json({error: 'Failed to fetch job'});
    }
});



const PORT = 4000;
app.listen(PORT, ()=>{
    console.log(`Dashboard API listening on ${PORT}`);
});