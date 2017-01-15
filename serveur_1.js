//initialisation des dependances 
var http = require('http');
var url = require('url');
var mysql = require('mysql');
var auteur = require('./auteur');
//paramétrage de la connection à la BDD
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});
connection.connect();


//debut http
	var server = http.createServer(function(req, res){
		var page = url.parse(req.url).pathname;
	    var author={prenom : '', nom: ''};
	    if (page == '/') {
	        res.writeHead(200, {"Content-Type": "text/html ; charset =utf-8"});
	        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
	    }
	    else if (page == '/1') {
			var ID=1;
			auteur.getAuthorById(ID,connection,author,res);
	    }
	    else if (page == '/2') {
			var ID=2;
			auteur.getAuthorById(ID,connection,author,res);
	    }
	    else if (page == '/3') {
			var ID=3;
			auteur.getAuthorById(ID,connection,author,res);
	    }
	    else{
	    	res.writeHead(404, {"Content-Type": "text/html ; charset =utf-8"});
			res.write('Aucun auteur ne correpsond à cet ID');
			res.end();
	    }
	});
//fin http
console.log('server listening at 8080');
server.listen(8080);