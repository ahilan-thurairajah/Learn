'use strict';
var url = require('url');
var adr = 'http://localhost:8080/default.htm?year=2017&month=february';
var q = url.parse(adr, true);

console.log('Host: ' + q.host);
console.log('Path Name: ' +  q.pathname);
console.log('Search: ' + q.search);
console.log('Query Month: ' + q.query.month);


