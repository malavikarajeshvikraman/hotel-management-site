const { Router } = require('express');
const express = require('express');
const sql1 = express.Router()
const db = require('../db/data')

sql1.get("/",async (req,res,next) => {
    try {
             let results = await db.all();
             res.json(results);

    } catch(e){
        console.log(e);
        res.sendStatus(500);
    }
});

module.exports=sql1