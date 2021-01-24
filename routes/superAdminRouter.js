const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authenticate = require('../authenticate');

var Tweets = require('../models/tweets');
var superAdminServices = require('../service/superAdminServices');


const superAdminRouter = express.Router();

superAdminRouter.use(bodyParser.json());

//Handling '/superAdmin' end point
superAdminRouter.get('/', authenticate.verifyUser, async (req,res,next)=>{
  if(authenticate.roleCheck(req.user.role, "request_read"))
  {
    try {
      const allRequests = await superAdminServices.getAllRequests(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'allRequests': allRequests}});   
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not a Super Admin');
    err.status=403;
    return next(err);
  }
});

superAdminRouter.put('/:requestId', authenticate.verifyUser, async (req,res,next)=>{  
  if(authenticate.roleCheck(req.user.role, "request_edit"))
  {
    try {
      const request = await superAdminServices.changeRequestStatus(req, next);
      res.statusCode=200;
      res.setHeader('Content-Type','application/json');
      res.json({'Success':true,'data':{'requestUpdated': request}});
    } catch (error) {
      next(error);
    }
  }
  else
  {
    err =new Error('Sorry, unauthorised access. You are not a Super Admin');
    err.status=403;
    return next(err);
  }
});

//Handling '/superAdmin/logs' end point
superAdminRouter.get('/logs', authenticate.verifyUser, async (req,res,next)=>{
    if(authenticate.roleCheck(req.user.role, "logs_read"))
    {
      try {
        const allLogs = await superAdminServices.getAllLogs(req, next);
        res.statusCode=200;
        res.setHeader('Content-Type','application/json');
        res.json({'Success':true,'data':{'allRequests': allLogs}});   
      } catch (error) {
        next(error);
      }
    }
    else
    {
      err =new Error('Sorry, unauthorised access. You are not a Super Admin');
      err.status=403;
      return next(err);
    }
  });
  
module.exports = superAdminRouter;