const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

const requestSchema = new Schema({
    adminId:{
        type: Number,
        required:true
    },
    dbAltered:{
        type:String,
        required:true
    },
    dbFieldId:{
        type:Number,
        required:true
    },
    author:{
        type: Number,
        required:true
    },
    activityType:{
        type: String,
        required:true
    },
    status:{
        type: String,
        required: true
    }
},{
    timestamps:true
});

autoIncrement.initialize(mongoose.connection);
requestSchema.plugin(autoIncrement.plugin, 'requestId');

var Requests = mongoose.model('Request',requestSchema);
module.exports = Requests;