var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken');

var config = require('./config');
var roleDef = config.roleDef;
//'local strategy'
exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//creating and exporting 'json-web-token'
exports.getToken = function(user) {
    return jwt.sign(user, config.secretKey, {expiresIn: 36000});
};

//creating 'options' for jsonwebtoken strategy
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

//'jsonwebtoken strategy'
exports.jwtPassport = passport.use(new JwtStrategy( opts, (jwt_payload, done)=>{
    console.log('JWT payload :- ', jwt_payload);
    User.findOne({_id: jwt_payload._id}, (err,user)=>{
        if(err){
            return done(err, false);
        }
        else if(user){
            return done(null, user);
        }
        else{
            return done(null, false);
        }
    });
    
}));

//Role based Authorization
exports.roleCheck = function(userRole, permissionRole) {
    return roleDef[userRole].includes(permissionRole);
};

exports.verifyUser = passport.authenticate('jwt', {session:false});
