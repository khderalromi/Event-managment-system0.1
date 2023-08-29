const passport=require('passport');
const user=require('../models/user');
const jwtStrategy=require('passport-jwt').Strategy;




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