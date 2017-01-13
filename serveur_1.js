//initialisation des dependances 
var http = require('http');
var url = require('url');
var mysql = require('mysql');

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
	        res.writeHead(200, {"Content-Type": "text/plain"});
	        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
	    }
	    else if (page == '/1') {
			var ID=1;
			getAuthorById(ID,connection,author,res);
	    }
	    else if (page == '/2') {
			var ID=2;
			getAuthorById(ID,connection,author,res);
	    }
	    else if (page == '/3') {
			var ID=3;
			getAuthorById(ID,connection,author,res);
	    }
	    else{
	    	res.writeHead(404, {"Content-Type": "text/plain"});
			res.write('Aucun auteur ne correpsond à cet ID');
			res.end();
	    }
	});
//fin http
console.log('server listening at 8080');
server.listen(8080);

/*
fonction de mapping et de rpeonse http
resBDD : resultat de la requete en BDD sous forme d'un objet {FIRST_NAME :,LAST_NAME:}
aut : auteur à remonter dans la réponse sous forme d'un objet {prenom :,nom:}
resHttp : resultat de la fonction de callback du http.createServer
*/
function mapAndWrite(resBDD,aut,resHttp){
	aut.prenom=resBDD.FIRST_NAME;
	aut.nom=resBDD.LAST_NAME;
	resHttp.writeHead(200, {"Content-Type": "text/plain"});
	resHttp.write('Vous avez choisi '+aut.prenom+' '+aut.nom);
	resHttp.end();
}

/*
fonction qui execute une requete en base 
authorId : id de l'auteur à trouver en base
connect : nom de la connection créée avec mysql
aut: auteur à envoyer à la fonction de mapping pour être utilisé
resHttp: resultat de la fonction de callback du http.createServer : à envoer à la fonction de mapping pour pouvoir repondre
*/
function getAuthorById(authorId,connect,aut,resHttp){
	var query = connect.query('select * from authors where id = ?',authorId, function(err,result){
		if(err){
	    	console.error(err);
	    	return;
		}
		mapAndWrite(result[0],aut,resHttp);
	})
}
