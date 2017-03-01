#!/usr/bin/env node

var express = require('express')
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

var app = express()

var topics = require("./topics.js")();

var settings = require("./settings.js");

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
	console.log("comment put request!", req.body);
	
	var comment = {
		owner:req.body.name,
		time:Date.now(),
		text:req.body.comment
		};
	
	topics.putComment(req.params.UUID,comment)
	
	res.send("comment recived" + req.body);
	LastAction = comment.time;
})

app.get('/API/LastAction',function(req,res){
	res.send({a:LastAction});
})

app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

