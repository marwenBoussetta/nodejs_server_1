var mysql = require('mysql');
//paramétrage de la connection à la BDD
var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});
connection.connect();

/*
makes sure that the id requested is in range
connect: object returned by the mysql.createConnection()
authorId: the id got from the request using express and req.params.id
resHttp: the promise of the get function of express

dependency with : getAuthorById()
*/
exports.ensureAuthor = function (authorId,resHttp){
	var length_query = connection.query('select ID from authors', function(err,length_result){
	    if(err){
	        console.error(err);
	        return;
	    }
	    if(authorId>length_result.length){
	    	resHttp.setHeader('Content-Type', 'text/plain ; charset=utf-8');
    		resHttp.end('No author with this ID');
	    }
	    else{
	    	getAuthorById(connection,authorId,resHttp);
	    }
	});
}
/*
makes sure that the id requested is in range
connect: object returned by the mysql.createConnection()
authorId: the id got from the request using express and req.params.id
resHttp: the promise of the get function of express
*/
var getAuthorById = function(connect,authorId,resHttp){
	var author_query = connect.query('select * from authors where ID = ?',authorId, function(err,result){
    	if(err){
        	console.error(err);
        	return;
    	}
    	/*
    	resHttp.setHeader('Content-Type', 'json ; charset=utf-8');
		resHttp.end('Vous avez choisi de consulter ' + result[0].FIRST_NAME+' '+result[0].LAST_NAME);
		*/
		var botto ={oto :result[0].FIRST_NAME, moto :result[0].LAST_NAME}
		resHttp.render('index',botto);
	});
}