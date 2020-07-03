const mysql = require('mysql');
const mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'UserPassword01',
    database: 'users'
});



mysqlConnection.connect(function (err){
    if(err){
        console.log(err);
        return;
    }else{
        console.log('connected to db');
    }
});

module.exports = mysqlConnection;