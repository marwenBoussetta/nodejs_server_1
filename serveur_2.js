var express = require('express');
var mysql = require('mysql');

//paramétrage de la connection à la BDD
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});
connection.connect();
var app = express();

app.get('/:id', function(req, res) {
	ensureAuthor(connection,req.params.id,res);    
});

app.listen(8080);
console.log('listening to port 8080');

function ensureAuthor(connect,authorId,resHttp){
	var length_query = connect.query('select ID from authors', function(err,length_result){
	    if(err){
	        console.error(err);
	        return;
	    }
	    console.log(length_result.length);
	    if(authorId>length_result.length){
	    	resHttp.setHeader('Content-Type', 'text/plain ; charset=utf-8');
    		resHttp.end('Aucun auteur avec cet ID');
	    }
	    else{
	    	getAuthorById(connect,authorId,resHttp);
	    }
	});
}

function getAuthorById(connect,authorId,resHttp){
	var author_query = connect.query('select * from authors where ID = ?',authorId, function(err,result){
    	if(err){
        	console.error(err);
        	return;
    	}
	   	resHttp.setHeader('Content-Type', 'json ; charset=utf-8');
		resHttp.end('Vous avez choisi de consulter ' + result[0].FIRST_NAME+' '+result[0].LAST_NAME);
	});
}