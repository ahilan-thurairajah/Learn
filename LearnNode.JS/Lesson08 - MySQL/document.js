var url = require('url'); 
var fs = require('fs');
var db = require("./LearnNodeJS-Database");

exports.ProcessRequest = function (req, res) {
    var q = url.parse(req.url, true);
    var fileName = "./web" + q.pathname;

    fs.readFile(fileName, function (err, data) {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end("File not found.");
        }
        else {
            var output = data.toString();
            res.writeHead(200, { 'Content-Type': 'text/html' });

            switch (q.query.task) {
                case "CreateDatabase": 
                    output = output.replace("<td id=\"results\" colspan=\"2\"></td>", "<td id=\"results\" colspan=\"2\">" + db.CreateDatabase(res) + "</td>");
                    res.write(output);
                    break;
                case "CreateTable":
                    output = output.replace("<td id=\"results\" colspan=\"2\"></td>", "<td id=\"results\" colspan=\"2\">" + db.CreateTable(res) + "</td>");
                    res.write(output);
                    break;
                case "InsertTableRow":
                    output = output.replace("<td id=\"results\" colspan=\"2\"></td>", "<td id=\"results\" colspan=\"2\">" + db.InsertTableRow(res) + "</td>");
                    res.write(output);
                    break;
                default: 
                    res.end(output);
                    break;
            }
        }
    });

}

