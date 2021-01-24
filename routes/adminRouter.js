const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

var Tweets = require('../models/tweets');
var tweetServices = require('../service/tweetServices');
var adminServices = require('../service/adminServices');
const { request } = require('express');


const adminRouter = express.Router();

adminRouter.use(bodyParser.json());

//Handling '/admin' end point
adminRouter.get('/', authenticate.verifyUser, async (req,res,next)=>{
  if(authenticate.roleCheck(req.user.role, "user_read"))
  {
    try {
      const allUsers = await adminServices.getAllUsers(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'allUsers': allUsers}});   
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});

adminRouter.put('/:userId', authenticate.verifyUser, async (req,res,next)=>{  
  if(authenticate.roleCheck(req.user.role, "user_edit"))
  {
    try {
      const user = await adminServices.changeUserDetails(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'userUpdated': user}});
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});


//Handling '/admin/tweets' end point
adminRouter.get('/tweets/:userId', authenticate.verifyUser, async (req,res,next)=>{
  if(authenticate.roleCheck(req.user.role, "admin_tweet_read"))
  {
    try {
      const allSortedTweets = await tweetServices.getUserSortedTweets(req.params.userId, req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success': true, 'data' : {'tweets' : allSortedTweets} });   
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }  
});

adminRouter.post('/tweets/:userId', authenticate.verifyUser, async (req,res,next)=>{
  if(authenticate.roleCheck(req.user.role, "admin_tweet_create"))
  {
    try {
      const tweet = await tweetServices.postUserTweet(req.params.userId, req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'tweetPosted': tweet}});   
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});

adminRouter.put('/tweets/:userId/:tweetId', authenticate.verifyUser, async (req,res,next)=>{  
  if(authenticate.roleCheck(req.user.role, "admin_tweet_edit"))
  {
    try {
      const tweet = await Tweets.findById(req.params.tweetId);
      if(tweet.author == req.params.userId)
      {
        const tweet = await tweetServices.changeUserTweet(req, next);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({'Success':true,'data':{'tweetUpdated': tweet}});
      }
      else
      {
        err =new Error('Sorry admin, tweet is by a different author');
        err.status=403;
        return next(err);
      }
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});

adminRouter.delete('/tweets/:userId/:tweetId', authenticate.verifyUser, async (req,res,next)=>{
  if(authenticate.roleCheck(req.user.role, "admin_tweet_delete"))
  {
    try {
      const tweet = await Tweets.findById(req.params.tweetId);
      if(tweet.author == req.params.userId)
      {
        const result = await tweetServices.deleteUserTweet(req, next);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({'Success':true,'data':{'tweetDeleted': result}});
      }
      else
      {
        err =new Error('Sorry admin, the tweet is by a different author');
        err.status=403;
        return next(err);
      }
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});


//Handling /admin/request end point
adminRouter.post('/request', authenticate.verifyUser, async (req,res,next)=>{  
  if(authenticate.roleCheck(req.user.role, "request_create"))
  {
    try {
      const request = await adminServices.postRequest(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'requestCreated': request}});
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not an Admin');
    err.status=403;
    return next(err);
  }
});

module.exports = adminRouter;
