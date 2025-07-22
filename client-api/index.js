const express = require('express');
const bodyParser = require('body-parser');
//const {v4 : uuidv4} = require('uuid');
const {enqueue} = require('../queue');

const app = express();
app.use(bodyParser.json());

//GET METHOD
app.get('/status/:jobId', async (req,res)=>{
    try{
        const {jobId} = req.params;
        const status = await fetchStatus(jobId);
        if(status && Object.keys(status).length>0)
        res.status(202).json(status);
        else 
        res.status(404).json({error:'could not find'});
    }
    catch(err){
        console.error('Failed to get status',err);
        res.status(500).json({error: 'error fetching data'});
    }
})




//ENDS



app.post('/submit', async (req,res)=>{
   
   try{
    const {type, payload, priority}   = req.body;
    
    if(!type || !payload){
       return res.status(400).json({ error: 'Missing type or payload'});
    }

    //const jobId = uuidv4();
    const jobId = await enqueue({type,payload,priority});


    

    console.log(`Job ${jobId} submitted:`, {type, payload, priority});

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