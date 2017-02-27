#!/usr/bin/env node

var express = require('express')
var app = express()

var settings = require("./settings.js");

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(settings.port, function () {
  console.log('Example app listening on port ' + settings.port + '!')
  console.log('http://localhost:' + settings.port + '')
})

