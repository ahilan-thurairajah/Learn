'use strict';
var uc = require('upper-case');
var http = require('http');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var myEventHandler = function () {
    console.log('I hear a scream!');
}

eventEmitter.on('scream', myEventHandler);

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(uc(req.url));
}).listen(8080);

eventEmitter.emit('scream');