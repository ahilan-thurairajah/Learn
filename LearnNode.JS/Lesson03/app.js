var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('Home.html', function (err, data) {
        fs.writeFile('dataFile.txt', data, function (err) {
            res.write('file contents were written.');
            res.end();
        })
        //res.write(data);
    });
}).listen(8080);

