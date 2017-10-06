var http = require('http');
var url = require('url');
var fs = require('fs');
var dt = require('./myfirstmodule.js');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true).query;
    var txt = q.year + " " + q.month;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<pre>Hello World! \n');
    res.write(txt + "\n");
    res.write('The date and time are currently: ' + dt.myDateTime() + '</pre>');
    res.end();
}).listen(8080);

