const mongoose = require('mongoose');
const authenticate = require('../authenticate');

const Requests = require('../models/requests');
const Logs = require('../models/logs');


async function getAllRequests(req, next){
    try {
        const allRequests = await Requests.find();
        return allRequests;
               
    } catch (error) {
        next(error);
    }
}

async function getAllLogs(req, next){
    try {
        const allLogs = await Logs.find();
        return allLogs;
               
    } catch (error) {
        next(error);
    }
}

async function changeRequestStatus(req, next){
    try {
        //body already contains what to be updated
        const request = await Requests.findByIdAndUpdate(
            req.params.requestId,
            {
                $set : req.body
            });
        return request;
               
    } catch (error) {
        next(error);
    }
}

module.exports = {getAllRequests, changeRequestStatus, getAllLogs};
