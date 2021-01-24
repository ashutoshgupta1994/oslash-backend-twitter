const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

const tweetSchema = new Schema({
    tweetContent:{
        type:String,
        required:true
    },
    likes:{
        type:Number,
        default: 0
    },
    retweets:{
        type:Number,
        default: 0
    },
    author:{
        type: Number,
        ref: 'User'
    },
    lastAuthor:{
        type: Number,
        ref: 'User'
    }
},{
    timestamps:true
});

autoIncrement.initialize(mongoose.connection);
tweetSchema.plugin(autoIncrement.plugin, 'tweetId');

var Tweets = mongoose.model('Tweet',tweetSchema);
module.exports = Tweets;