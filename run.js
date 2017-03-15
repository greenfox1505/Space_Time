#!/usr/bin/env node

var settings = require("./settings.js");

var express = require('express')
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var app = express()

var topics = require("./topics.js")(settings);

var LastAction = 0;

//static/index.html
app.use('/', express.static('static'))

app.get('/API', function (req, res) {
  res.send('Hello API!')
});

app.get('/API/GetTopicList',function(req,res){
	res.send(topics.getTopicList());
})
app.get('/API/GetTopicData/:UUID',function(req,res){
	res.send(topics.getTopicData(req.params.UUID));
})

app.put('/API/PutComment/:UUID', jsonParser ,function(req,res){
	if(req.body.comment != "" && req.body.comment != null){
		console.log("comment put request!", req.body);
		var comment = {
			owner:req.body.name,
			time:Date.now(),
			text:req.body.comment
			};

		var value = topics.putComment(req.params.UUID,comment);

		if(value !=0){
			res.send("ERROR:" + value);
		}
		else{
			res.send("comment recived" + req.body);
		}
		LastAction = comment.time;
	}
	else{
		console.log("Bad Comment by : "+ req.body.name);
		res.send("Bad Comment!");
	}
})

app.put('/API/PutTopic', jsonParser ,function(req,res){
	if(req.body.title != "" && req.body.title != null){
		var topic = {
			owner:req.body.name,
			time:Date.now(),
			title:req.body.title
			};
		var value = topics.putTopic(topic);
		console.log(topic);
		
		
		res.send("posted");
		
		LastAction = topic.time;
	}
	else{
		res.status(400);
		res.send("error!");
	}
})


app.get('/API/LastAction',function(req,res){
	res.send({a:LastAction});
})


app.get('/API/ReloadRequester',function(req,res){
	
})

function ReloadRequest(tags){
	
}


app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

