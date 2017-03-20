#!/usr/bin/env node

var settings = require("./settings.js");

var express = require('express')
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var app = express()

var topics = require("./topics.js")(settings);

var LastAction = 0;

//debug all requests
app.all("/API*",function(req,res,next){
	//wait, this could be used for user auth! durp. fuckit,debugger for now!
	console.log("Serving: " + req.url);
	next();
})

//static/index.html
app.use('/', express.static('static'))

app.get('/API', function (req, res) {
	res.send('Hello API!')
});

app.get('/API/GetTopicList',function(req,res){
	console.log("/API/GetTopicList Served");
	res.send(topics.GetTopicList());
})

app.get('/API/GetTopic/:GUID',function(req,res){
	ThisTopic = topics.GetTopic(req.params.GUID);
	if(ThisTopic == null){
		//return error
		res.send({msg:"ERROR! Bad topic ID!"});
	}
	else
		res.send(ThisTopic);
})

app.put("/API/PutComment/:GUID", jsonParser, function(req,res){
	console.log("comment", req.body);
	NewComment = {
		OwnerGUID:req.body.OwnerGUID,
		TopicGUID:req.params.GUID,
		Body:req.body.Body,
	}
	var GUIDComment = topics.PutComment(NewComment);
	res.send({msg:"Comment Posted! ", GUID: GUIDComment});
})

app.put("/API/PutTopic", jsonParser, function(req,res){
	console.log("Topic", req.body);
	var topicID = topics.PutTopic({
		OwnerGUID:req.body.OwnerGUID,
		Body:req.body.Body
	})
	res.send({msg:"TopicPosted!", GUID:topicID});
})

app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

