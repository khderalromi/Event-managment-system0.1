var express = require('express');
var router=express.Router();
const card=require('../models/cardshema')

/* GET home page. */
router.get('/', (req, res,next) =>
{
  res.redirect('/users/main')
  
})



module.exports = router;
