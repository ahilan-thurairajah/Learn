var url = require('url'); 
var fs = require('fs');

exports.ProcessRequest = function (req, res) {
    var q = url.parse(req.url, true);
    var fileName = "." + q.pathname;

    fs.readFile(fileName, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("File not found.");
        }
        else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data.toString());
        }
    });
}

