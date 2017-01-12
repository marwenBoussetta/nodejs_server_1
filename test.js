//declaration des dépendances
var http = require('http');
var url = require('url');

//creation de l'objet http
var server = http.createServer(function(req, res) {
    var page = url.parse(req.url).pathname;
    console.log(page);
    if (page == '/') {
        res.writeHead(200, {"Content-Type": "text/plain"});
        res.write('Vous êtes à l\'accueil, que puis-je pour vous ?');
    }
    else if (page == '/1') {
    	res.writeHead(200, {"Content-Type": "text/plain"});
		res.write('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
    }
    else if (page == '/2') {
   	    res.writeHead(200, {"Content-Type": "text/html"});
    	res.write('<!DOCTYPE html>'+
'<html>'+
'    <head>'+
'        <meta charset="utf-8" />'+
'        <title>Ma page Node.js !</title>'+
'    </head>'+ 
'    <body>'+
'     	<p>Voici un paragraphe <strong>HTML</strong> !</p>'+
'    </body>'+
'</html>');
    }
    else {
        res.writeHead(404, {"Content-Type": "text/html"});
        res.write('NOTHING IS FOUND HERE');    
    }
    res.end();
});
console.log('server listening at 8080');
server.listen(8080);
