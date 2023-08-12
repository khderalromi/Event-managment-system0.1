const passport=require('passport');
const user=require('../models/user');
const jwtStrategy=require('passport-jwt').Strategy;

//const localStrategy=require('passport-local').Strategy;
//var crypto=require('crypto')
/*passport.serializeUser((user, done) =>
{
    return done(null,user.id)
})
passport.deserializeUser((id, done) =>
{
    user.findOne({_id:id}).then((err, user) =>
    {
        return done(err,user)
    })
}) 
passport.use('local-signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback:true,
}, (req, email, password, done) =>
{
    
    user.findOne({email: email}).then((err, user) =>
    {
        console.log(user)
        if (err) {return done(err)}
        if (!user) {return done(null,false,req.flash('signinError','this user not found'))}
        if (! user.comparePassword(password)) {return done(null,false,req.flash('signinError','wrong password'))}
        return done(null,user)
    })
}
))***/


/**************jwt 
    var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.issuer = 'accounts.examplesoft.com';
opts.audience = 'yoursite.net';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));
******/



var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'random string';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
    user.findOne({_id: jwt_payload.id}).then(function (err, user)
    {
        console.log(jwt_payload)
       if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));