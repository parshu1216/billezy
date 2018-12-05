const express = require('express');
const router = express.Router();
//const mongoose = require('mongoose');
//const User = require('../models/user');
const jwt = require('jsonwebtoken');
//const db = "mongodb://parshu:parshu123@ds121371.mlab.com:21371/eventdb";
 //mongoose.Promise = global.Promise;

router.get('/', 
(req, res)=>{
    res.send('From API')
})

router.post('/register', (req, res) => {
    var dbFunctions = require('../models/controller');
    dbFunctions.createUser(req,res);
  })
module.exports = router