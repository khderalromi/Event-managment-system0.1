var express = require('express');
var router = express.Router();
const {check, validationResult}=require('express-validator');
const user=require('../models/user')
const card=require('../models/cardshema')
const passport=require('passport');
const {compareSync}=require('bcrypt');
const cors=require('cors')
const jwt=require('jsonwebtoken')
require('../config/passport')
const auth=require('../middleware/auth')




/********************* ************/
router.get('/signup', function (req, res, next)
{
  var errorsSignUp=req.flash('error');
  res.render('user/signup', {errorsSignUp: errorsSignUp,style:'login.css'})
  
});
router.post('/signup', [
  check('email').not().isEmpty().withMessage('Please Enter Your Email'),
  check('email').isEmail().withMessage('Please Enter  Valid Email'),
  check('password').not().isEmpty().withMessage('Please Enter Your Password'),
  check('password').isLength(min=5).withMessage('Please Enter Password more than 5 char'),
  check('confirm-password').custom((value, {req}) =>
  {
    if (value!==req.body.password)
    {
      throw new Error('password and confirm password not matched');
    }
    return true
  })
], (req, res, next) =>
{
  const errorsVlidation=validationResult(req);
  if (! errorsVlidation.isEmpty())
  {
    console.log(errorsVlidation.errors);
    var validationMessage=[]
    for (var i=0;i<errorsVlidation.errors.length;i++)
    {
      validationMessage.push(errorsVlidation.errors[i].msg)
    }
    console.log(validationMessage)
    req.flash('error', validationMessage)
    res.redirect('signup')
    return;
  }
  user.findOne({email:req.body.email}).then((doc,error) =>
  {
    if (error) {console.log(error)}
    if (doc)
    {
    
      req.flash('error','this email is alredy exists');
      res.redirect('signup')
      return;
    }
    const users=new user({
    email: req.body.email,
    password: new user().hashPassword(req.body.password)
    })
  users.save().then((user, err) =>
  {
    if (err)
    {
      console.log(err)
    }
    console.log(user)
    console.log(";;;;;;;"+user.email)
    const payload={
      useremail: user.email,
      id: user._id
    }
    const token=jwt.sign(payload, "random string", {expiresIn: '1h'})
   
    res.cookie("token", token, {
      httpOnly:true
    })
/*********to store email in cookies and show it in header ************/
    const decoded=jwt.verify(token, "random string");
    const profile=decoded.useremail;
    res.cookie("myprofile", profile)

    /*********************** *************/
    res.redirect('/')
  })
    
  })

}
);

/*****************************end sign up ***************************************/




/*****************************start sign in ************************************/

router.get('/signin', (req, res,next) =>
{
  
    res.render('user/signin',{style:'login.css'})
  })
  

router.get('/protected', passport.authenticate('jwt', {session: false}),(req,res)=>{res.json(req.user)})
router.post('/signin', (req, res,next) =>
{
  user.findOne({email: req.body.email}).then((user) =>
  {
    //not user found
    if (!user)
    {
      return res.status(401).send({
        success: false,
        massage: 'could not find user'
      })
    }
    //incorrect password
    if (!compareSync(req.body.password, user.password))
    {
      return res.status(401).send({
        success: false,
        massage: 'incorrect password'
      })
    }
    const payload={
    useremail: user.email,
    id:user._id
  }
  const token=jwt.sign(payload, "random string", {expiresIn: '1h'})
   
    res.cookie("token", token, {
      httpOnly:true
    })
/*********to store email in cookies and show it in header ************/
    const decoded=jwt.verify(token, "random string");
    const profile=decoded.useremail;
    res.cookie("myprofile", profile)
/******************** ***************************/
  
    res.redirect('/')
  })

  
})

/***************************end sign in *******************************/


/**********start creat video room ****/
const {v4: uuidV4}=require('uuid')
router.get('/creatRoom',auth, (req, res,next) =>
{
  res.render('meet/creatRoom',{roomId: uuidV4()})
  
})
router.get('/room/:roomId',auth, (req, res) =>
{
  res.render('meet/room',{roomId:req.params.roomId})
})
router.post('/creatRoom',auth, (req, res, next) =>
{
  res.redirect('room/'+req.body.roomId)
})


/********join room******* */
router.get('/joinRoom',auth, (req, res,next) =>
{
  res.render('meet/joinroom',{roomId: uuidV4()})
  
})

router.post('/joinRoom',auth, (req, res, next) =>
{
  res.redirect('room/'+req.body.roomId)
})



/*****delete *****/





module.exports = router;