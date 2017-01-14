var express = require('express');
var session = require('cookie-session'); // Charge le middleware de sessions
var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var app = express();


app.use(session({secret: 'todotopsecret'}));
app.get('/todo', function(req, res) {
	console.log('showing');
	req.session.toBeSeen='init';
	res.end(req.session.toBeSeen);
});

app.get('/todo/ajouter/', function(req, res) {
	req.session.toBeSeen = (req.session.toBeSeen || 'f') + ' fuck ';
	console.log(req.session.toBeSeen);
	res.end('okay');
});
app.listen(8080);
console.log('listening to port 8080');

