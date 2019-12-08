const express = require('express');
const router = express.Router();
const Entry = require('../model/entry');

 router.route('/all').get((req, res) =>{
    Entry.find({})
    .then((doc)=>{
        console.log('this is the doc');
        console.log(doc);
        res.json(doc);
    })
    .catch(err =>{
        res.send(err);
    })
 });

module.exports = router;

