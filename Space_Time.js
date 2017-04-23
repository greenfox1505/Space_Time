#!/usr/bin/env node

var settings = require("./settings.js");

var express = require('express')
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var app = express()

var topics = require("./topics.js")(settings.TopicsArgs);
var users = require("./users.js")(settings.UsersArgs);

var LastAction = 0;

//debug all requests
app.all("/API*",function(req,res,next){
	//wait, this could be used for user auth! durp. fuckit,debugger for now!
	console.log(Date.now() + ";Serving:" + req.url );
	next();
})

//static/index.html
app.use('/', express.static('static'))

app.get('/API', function (req, res) {res.send('Hello_Wolrd.api')});

app.get('/API', function (req, res,next){
	
});

app.get('/API/GetTopicList',function(req,res){
	res.send(topics.GetTopicList());
})

app.get('/API/GetTopic',function(req,res){
	res.send(topics.GetTopic(req.query.GUID));
})

function ValidCheck(data,type){//function does not return, mearly throws errors on fail
	console.log("Valid Check:" , data.body);
	if(data.body.Body == "" || data.body.Body == null){
		console.log("nope ",data.body.Body)
		throw "INVALID BODY";
	}
	//check if user has permission!
	if(!users.CheckUser({
		PublicGUID:data.body.PublicGUID,
		PrivateGUID:data.body.PrivateGUID})){
		throw "USER PIRAVE DOES NOT MATCH PUBLIC"
	}
	
	
}

app.put("/API/PutComment", jsonParser, function(req,res){
	ValidCheck(req,"Comment");
	console.log("Comment:", req.body);
	var NewComment = topics.PutComment({
		OwnerGUID:req.body.PublicGUID,
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
		OwnerGUID:req.body.PublicGUID,
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




//accounts
app.get("/Account/NewAccount",function(req,res){
	if(req.query.Name == null || req.query.Name == "")
	{
		throw "Bad User Name!";
	}
	var NewUser = users.NewUser(req.query.Name);
	console.log(Date.now() + ";New User!:" + NewUser.Public.Name );
	res.send(NewUser);
})

app.get("/Account",function(req,res){
	//find user account by req.query.GUID
	res.send(users.GetUser(req.query.GUID));
});

app.get("/Account/CopyCode",function(req,res){
	//copy account to new device!
});

app.delete("/Account/Delete",function(req,res){
	console.log("Hitme",req.query);
	users.DeleteUser(req.query);
	//find and delete user. maybe delete all posts? idk. we'll see
	res.send("Account NOT Deleted");
});

