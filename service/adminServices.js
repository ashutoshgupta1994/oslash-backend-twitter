const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const User = require('../models/user');
const Requests = require('../models/requests');

async function getAllUsers(req, next){
    try {
        const allUsers = await User.find();
        return allUsers;
               
    } catch (error) {
        next(error);
    }
}

async function changeUserDetails(req, next){
    try {
        //body already contains what to be updated
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            {
                $set : req.body
            });
        return user;
               
    } catch (error) {
        next(error);
    }
}

async function postRequest(req, next){
    try {
        //body already contains what to be updated
        req.body.adminId = req.user._id;
        req.body.status = "Initiated";
        const request = await Requests.create(req.body);
        return request;
               
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllUsers, changeUserDetails, postRequest};
