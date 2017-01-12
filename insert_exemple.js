var mysql = require('mysql');

var connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bookshop'
});

connection.connect();
var table='authors';
var author ={
   
    FIRST_NAME : 'FIODOR',
    LAST_NAME : 'DOSTOIEVSKI'
};

var query = connection.query('insert into authors set ?', author, function(err,result){
    if(err){
        console.error(err);
        return;
    }
    console.log(query.sql);
    console.log(result)
});