const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

var Tweets = require('../models/tweets');
var tweetServices = require('../service/tweetServices');

const tweetRouter = express.Router();

tweetRouter.use(bodyParser.json());

//Handling '/tweets' end point
tweetRouter.get('/', authenticate.verifyUser, async (req,res,next)=>{
  try {
    const allSortedTweets = await tweetServices.getUserSortedTweets(req.user._id, req, next);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({'Success': true, 'data' : {'tweets' : allSortedTweets} });   
  } catch (error) {
    next(error);
  }
});

tweetRouter.post('/', authenticate.verifyUser, async (req,res,next)=>{
  try {
    const tweet = await tweetServices.postUserTweet(req.user._id, req, next);
    res.statusCode=200;
    res.setHeader('Content-Type','application/json');
    res.json({'Success':true,'data':{'tweetPosted': tweet}});   
  } catch (error) {
    next(error);
  }
});

tweetRouter.put('/:tweetId', authenticate.verifyUser, async (req,res,next)=>{  
  try {
    const tweet = await Tweets.findById(req.params.tweetId);
    if(tweet.author == req.user._id)
    {
      const tweet = await tweetServices.changeUserTweet(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'tweetUpdated': tweet}});
    }
    else
    {
      err =new Error('Sorry, unauthorised access. You are not tweet author');
      err.status=403;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
});

tweetRouter.delete('/:tweetId', authenticate.verifyUser, async (req,res,next)=>{
  try {
    const tweet = await Tweets.findById(req.params.tweetId);
    if(tweet.author == req.user._id)
    {
      const result = await tweetServices.deleteUserTweet(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'tweetDeleted': result}});
    }
    else
    {
      err =new Error('Sorry, unauthorised access. You are not tweet author');
      err.status=403;
      return next(err);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = tweetRouter;
