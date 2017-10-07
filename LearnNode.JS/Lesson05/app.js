'use strict';
var http = require('http');
var port = 8080;

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('HTTP Server Launched');
    res.end();
}).listen(port);

console.log('Server running on port ' + port);
