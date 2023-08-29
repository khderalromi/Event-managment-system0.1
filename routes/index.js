const {Router}=require('express');
var express = require('express');
var router=express.Router();
const card=require('../models/cardshema');
const user=require('../models/user');


/* GET home page. */
router.get('/',function(req, res, next) {
  card.find({}).then((resualt, error) =>{
    console.log(resualt)
    
    console.log('yyyeeess')
    var cardgrid=[];
    var colgrid=3;
    for (var i=0;i<=3;i+=colgrid)
    {
      if (i<1)
      {
        cardgrid.push(resualt.slice(0, 1));
      } else if (i>1)
      {
        cardgrid.push(resualt.slice(1,3))
      } 
    }
   
    res.render('index', {cardgrid1: cardgrid.slice(0, 1), cardgrid2: cardgrid.slice(1, 2), style: 'index.css'});
    
  }
  )  
});

router.get('/delete', (req, res) =>
{
  res.redirect('/')
})
router.post('/delete', (req, res, next) =>
{
  const id=req.body.id;
  card.deleteOne({_id: id}).then(( resault,err) =>
  {
    if (err) {console.log("errrrr")}
   {res.redirect('/')}
    
  })
})


module.exports = router;
