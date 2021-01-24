var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var autoIncrement = require('mongoose-auto-increment');

var userSchema = new Schema({
    firstname:{
        type: String,
        default: ''
    },
    lastname:{
        type: String,
        default: ''
    },
    email:{
        type: String,
        default: ''
    },
    role:{
        type:String,
        default:''
    }
});

autoIncrement.initialize(mongoose.connection);
userSchema.plugin(autoIncrement.plugin, 'userid');
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User',userSchema);