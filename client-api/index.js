const express = require('express');
const bodyParser = require('body-parser');
//const {v4 : uuidv4} = require('uuid');
const {enqueue} = require('../queue');

const app = express();
app.use(bodyParser.json());

app.post('/submit', async (req,res)=>{
   
   try{
    const {type, payload}   = req.body;
    
    if(!type || !payload){
       return res.status(400).json({ error: 'Missing type or payload'});
    }

    //const jobId = uuidv4();
    const jobId = await enqueue({type,payload});


    //for now just log it later to redis

    console.log(`Job ${jobId} submitted:`, {type, payload});

    res.status(202).json({message: 'Job accepted', jobId});
    } 
    catch (err)
    {
    console.error('Job enqueue failed:', err);
    res.status(500).json({error: 'Internal server error'});  
}
});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Client API listening on ${PORT}`);
});