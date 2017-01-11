var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});

connection.connect();

var query = connection.query('select * from livres', function(err,result){
    if(err){
        console.error(err);
        return;
    }
    //console.log(query.sql);
    console.log(result)
});