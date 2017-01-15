var express = require('express');
var app = express();
var auteur=require('./ecrivain')

app.set('view engine','ejs');
app.get('/:id', function(req, res) {
	auteur.ensureAuthor(req.params.id,res);    
});

app.listen(8081);
console.log('listening to port 8080');