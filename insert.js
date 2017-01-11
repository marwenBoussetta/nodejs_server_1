var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});

connection.connect();
var table='livres';
var book ={
   
    TITRE : 'KARAMAZOV',
    AUTEUR : 'DOSTO'
};

var query = connection.query('insert into livres set ?', book, function(err,result){
    if(err){
        console.error(err);
        return;
    }
    console.log(query.sql);
    console.log(result)
});