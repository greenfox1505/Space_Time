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
	console.log(Date() + ";Serving:" + req.url );
	next();
})

//static/index.html
app.use('/', express.static('static'))

app.get('/API', function (req, res) {res.send('Hello_Wolrd.api')});

app.get('/API/GetTopicList',function(req,res){
	res.send(topics.GetTopicList());
})

app.get('/API/GetTopic',function(req,res){
	res.send(topics.GetTopic(req.query.GUID));
})

function ValidCheck(data,type){//function does not return, mearly throws errors on fail
	if(data.body.Body == "" || data.body.Body == null){
		throw "INVALID BODY";
	}
}

app.put("/API/PutComment", jsonParser, function(req,res){
	ValidCheck(req,"Comment");
	console.log("Comment:", req.body);
	var NewComment = topics.PutComment({
		OwnerGUID:req.body.OwnerGUID,
		TopicGUID:req.query.GUID,
		Body:req.body.Body,
	});
	res.send({msg:"Comment Posted! ", GUID:NewComment.GUID});
	
	//throw message to subscriptions
	ToSubscribers({
		msg:"NewComment",
		TopicGUID:req.query.GUID,
		Comment:NewComment
		})
})

app.put("/API/PutTopic", jsonParser, function(req,res){
	ValidCheck(req,"Topic");
	console.log("Topic:", req.body);
	var NewTopic = topics.PutTopic({
		OwnerGUID:req.body.OwnerGUID,
		Body:req.body.Body
	})
	res.send({msg:"TopicPosted!", GUID:NewTopic.GUID});

	//throw message to subscriptions
	ToSubscribers({msg:"NewTopic",Topic:NewTopic})
})

var Subs = [];

function ToSubscribers(data){
	console.log("SubscriberUpdate with: \n", JSON.stringify(data,null,2));
	console.log("Subscription Message Responce Count =", Subs.length);
	
	var message = JSON.stringify(data);
	
	for( i in Subs){
		Subs[i].send(message);
	}
	Subs = [];
}
//proxy keep alive; cleans subs, forcing resend
setInterval(function(){
	for( i in Subs){
		Subs[i].send("Keep Alive");
	}
	Subs = [];
},60*1000);



app.get("/API/Subscribe", function(req,res){
	Subs.push(res);
})


app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

