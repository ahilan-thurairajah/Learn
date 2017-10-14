'use strict';
var http = require('http');
var d = require('./document');
var port = 8080;

http.createServer(function (req, res) {
    console.log('Processing request: ' + req.url);
    d.ProcessRequest(req, res);
}).listen(port);

console.log('Server running on port ' + port);