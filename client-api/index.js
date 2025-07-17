const express = require('express');
const bodyParser = require('body-parser');
const {v4 : uuidv4} = require('uuid');

const app = express();
app.use(bodyParser.json());

app.post('/submit', (req,res)=>{
    const {type, payload}   = req.body;
    
    if(!type || !payload){
       return res.status(400).json({ error: 'Missing type or payload'});
    }

    const jobId = uuidv4();

    //for now just log it later to redis

    console.log(`Job ${jobId} submitted:`, {type, payload});

    res.status(202).json({message: 'Job accepted', jobId});

});

const PORT = 3000;
app.listen(PORT, ()=>{
    console.log(`Client API listening on ${PORT}`);
});