var http = require('http');
var url = require('url');
var querystring = require('querystring');
var mysql = require('mysql');
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});

connection.connect();
var server = http.createServer(function(req, res) {
    var params = querystring.parse(url.parse(req.url).query);
    var author ={
       	FIRST_NAME : params['prenom'],
    	LAST_NAME : params['nom']
		};
    if ('prenom' in params && 'nom' in params) {
        var query = connection.query('insert into authors set ?', author, function(err,result){
    	if(err){
        	console.error(err);
        	return;
	    	}
   		});
    }
    res.end();
});
console.log("listening on port 8080");
server.listen(8080);