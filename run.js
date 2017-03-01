#!/usr/bin/env node

var express = require('express')
var app = express()

var topics = require("./topics.js")();

var settings = require("./settings.js");


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

app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

