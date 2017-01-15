
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
exports.getAuthorById=function(authorId,connect,aut,resHttp){
	var query = connect.query('select * from authors where id = ?',authorId, function(err,result){
		if(err){
	    	console.error(err);
	    	return;
		}
		mapAndWrite(result[0],aut,resHttp);
	})
}