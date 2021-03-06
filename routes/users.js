var express = require('express');
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.get('/',authenticate.verifyUser, function(req, res, next) {
  if(req.user.role === "role_admin"){
    User.find()
    .then((users)=>{
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json(users);
    },(err)=>next(err));
  }
  else{
    err = new Error('Only Admin can view User list')
    err.status=403;
    next(err);
  }
});

router.route('/:userId')
.get()


router.post('/signup', function (req,res,next) {
  User.register( new User({username: req.body.username}),
    req.body.password, (err, user)=>{
    if (err) {
      res.statusCode=500;
      res.setHeader('Content-Type','application/json');
      res.json({err: err});
    }
    else {
      user.role = 'role_user';
      if(req.body.email)
        user.email = req.body.email;
      if(req.body.firstname)
        user.firstname = req.body.firstname;
      if(req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err,user)=>{
        if (err){
          res.statusCode=500;
          res.setHeader('Content-Type','application/json');
          res.json({err: err});
          return;    
        }
        passport.authenticate('local')(req,res,()=>{
          res.statusCode=200;
          res.setHeader('Content-Type','application/json');
          res.json({success: true, status: 'Registration Successful'});
        });
      });
    }
  });
});

router.post('/login', passport.authenticate('local'), (req,res)=>{

  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode=200;
  res.setHeader('Content-Type','application/json');
  res.json({success: true, data: {token: token, userid : req.user._id}});
});

router.get('/logout',(req,res,next)=>{
  if(req.session){
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else{
    var err = new Error('Youare not logged in.');
    err.status = 403;
    next(err);
  }
});

module.exports = router;