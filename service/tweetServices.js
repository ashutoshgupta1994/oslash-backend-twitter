const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Tweets = require('../models/tweets');
const Logs = require('../models/logs');

async function getUserSortedTweets(userId, req, next){
    try {
        const allTweets = await Tweets.find(
            {author:userId},
            null,
            { sort : { updatedAt: -1}}
        );
        
        const log = await Logs.create(
            {
                dbAltered : "Tweets",
                dbFieldId : -1,
                author : req.user._id,
                activityType: "get"
            }
        );
        console.log(log);

        return allTweets;
               
    } catch (error) {
        next(error);
    }
}

async function getUserTweets(userId, req, next){
    try {
        const allTweets = await Tweets.find({author:userId});
        return allTweets;
               
    } catch (error) {
        next(error);
    }
}


async function postUserTweet(userId, req, next){
    try {
        //body already contains tweetContent
        req.body.author = userId;
        req.body.lastAuthor = req.user._id;
        const tweet = await Tweets.create(req.body);
        
        const log = await Logs.create(
            {
                dbAltered : "Tweets",
                dbFieldId : tweet._id,
                author : req.user._id,
                activityType: "post"
            }
        );
        console.log(log);
        
        return tweet;
               
    } catch (error) {
        next(error);
    }
}

async function changeUserTweet(req, next){
    try {
        //body already contains tweetContent
        const tweet = await Tweets.findByIdAndUpdate(
            req.params.tweetId,
            {
                $set : {
                    lastAuthor : req.user._id,
                    tweetContent : req.body.tweetContent
                }
        });

        const log = await Logs.create(
            {
                dbAltered : "Tweets",
                dbFieldId : tweet._id,
                author : req.user._id,
                activityType: "put"
            }
        );
        console.log(log);

        return tweet;
               
    } catch (error) {
        next(error);
    }
}

async function deleteUserTweet(req){
    try {
        var fieldId = req.params.tweetId;
        await Tweets.deleteOne(
            {_id : req.params.tweetId}
        );

        const log = await Logs.create(
            {
                dbAltered : "Tweets",
                dbFieldId : fieldId,
                author : req.user._id,
                activityType: "delete"
            }
        );
        console.log(log);

        return true;
               
    } catch (error) {
        next(error);
    }
}



module.exports = {getUserSortedTweets, getUserTweets, postUserTweet, deleteUserTweet, changeUserTweet};
