var express = require('express');
var router = express.Router();
var mongoose= require('mongoose');
var ResponseMessage = require('./../models/ResponseMessages');
var UrlUtility = require('./../Utility/UrlUtility');
var Response = require('./../dto/APIResponse');

 //GET home page. 
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var postResponseMessageRoute = router.route('/addResponseMessage');
var getAllResponseMessagesRoute = router.route('/getAllResponseMessages');
var getAllResponseMessagesOnBlockRoute = router.route('/getAllResponseMessagesOnBlock/:blockId');
var updateTitleRoute = router.route('/updateTitle/:responseMessageId/:titleText');
var utility = new UrlUtility(
    {
    });
// Connection URL. This is where your mongodb server is running.
var url =utility.getURL();
mongoose.connect(url, function (err, db) {
    if(err)
    {
        console.log("Failed to Connect to MongoDB");
    }
    else {
        console.log("Successfully Connected");
    }
});
updateTitleRoute.get(function(req, res){
    var responseMessageId = req.params.responseMessageId;
    var titleText = req.params.titleText;
    var response = new Response();
    ResponseMessage.findOne({ _id: responseMessageId }
        ,function (err, responseMessage) {
            if (err)
                res.send(err);
            else {
                ResponseMessage.update({ _id: responseMessage._doc._id },{'data.text':titleText},{},function(err, user)
                {
                   if(err)
                   {
                        res.json(err);
                   }
                   else
                   {
                        response.message = "Success";
                        response.code = 200;
                        res.json(response);
                   }
                });
            }
        });
});
getAllResponseMessagesOnBlockRoute.get(function(req, res){
    var blockId = req.params.blockId;
    var response = new Response();
    ResponseMessage.find({_blockId: blockId}, function (err, responseMessages) {
        if (err)
        {
            res.send(err);
        }
        else
        {
            response.data = responseMessages;
            response.message = "Success";
            response.code = 200;
            res.json(response);
        }
    });                
});
postResponseMessageRoute.post(function(req, res) {
    // Create a new instance of the Beer model
    var responseMessage = new ResponseMessage();
    var response = new Response();
    var date = new Date();
    // Set the beer properties that came from the POST data
        responseMessage.data = req.body.data;
        responseMessage.type = req.body.type;
        responseMessage._blockId = req.body._blockId;
        responseMessage.createdOnUTC = date;
        responseMessage.updatedOnUTC = date;
        responseMessage.isDeleted = false; 
        console.log(responseMessage);
        // Save the beer and check for errors
        responseMessage.save(function(err) {
            if (err) {
                res.send(err);
            }
            else {
                response.data = responseMessage;
                response.message = "Success: New Created";
                response.code = 200;
                res.json(response);
                console.log('done');
            }
        });
    
    
});

getAllResponseMessagesRoute.get(function (req, res) {
    // Create a new instance of the Beer model
    var response = new Response();
    // Save the beer and check for errors
    
    ResponseMessage.find({}, null, { sort: { '_id': -1 } }, function (err, responseMessages) {
        if (err)
        {
            res.send(err);
        }
        else
        {
            response.message = "Success";
            response.code = 200;
            response.data = responseMessages;
            res.json(response);
        }
    });
});
module.exports = router;


