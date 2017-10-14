var mysql = require("mysql");
var databaseName = "LearnNodeJS";
var tableName = "customers";
var response;

var events = require('events');
var eventEmitter = new events.EventEmitter();

var databaseEventHandler = function (request, status) {
    if (status == null)
        status = "Database request was processed.";
    console.log(status);
    response.end(status);
}

eventEmitter.on("DB-REQUEST", databaseEventHandler);

exports.CreateDatabase = function (res) {
    response = res;
    ExecuteSQL("create database " + databaseName, null, "CreateDatabase");
    return "Request to create database was made. <br />" ;
}

exports.CreateTable = function (res) {
    response = res;
    ExecuteSQL("CREATE TABLE " + tableName + " (name VARCHAR(255), address VARCHAR(255))", databaseName, "CreateTable");
    return "Request to create 'customer' table was made. <br />";
}

exports.InsertTableRow = function (res) {
    response = res;
    ExecuteSQL("INSERT INTO " + tableName + " (name, address) VALUES ('Company Inc', 'Highway 37')", databaseName, "InsertTableRow");
    return "Request insert row was made. <br />";
}

function ExecuteSQL(sql, database, dbRequest) {
    var    con = mysql.createConnection({
        host: "35.185.120.30",
        user: "root",
        password: "GBsMIK8SwO9ptvMioi8d",
        database: databaseName
    });

    con.connect(function (err) {
        if (err) {
            eventEmitter.emit("DB-REQUEST", dbRequest, err.message);
            con.destroy();
        }
        else
            console.log("Connected!");

        con.query(sql, function (err, results) {
            if (err) {
                eventEmitter.emit("DB-REQUEST", dbRequest, err.message);
            }
            else {
                console.log("Database created");
                eventEmitter.emit("DB-REQUEST", dbRequest, null);                
            }

            con.destroy();
        });
    });
}