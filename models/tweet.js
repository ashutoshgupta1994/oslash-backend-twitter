const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    replies:[replySchema]
},{
    timestamps:true
});

var Tweets = mongoose.model('Dish',tweetSchema);
module.exports = Tweets;