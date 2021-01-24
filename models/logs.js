const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

const logSchema = new Schema({
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
    }
},{
    timestamps:true
});

autoIncrement.initialize(mongoose.connection);
logSchema.plugin(autoIncrement.plugin, 'logId');

var Logs = mongoose.model('Log',logSchema);
module.exports = Logs;