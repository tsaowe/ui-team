var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : '192.168.100.101',
    user     : 'root',
    password : '123456',
    database : 'orcadt',
    port     :  3307
});

connection.query('SELECT * from user', function (error, results, fields) {
    if (error) throw error;

    console.log(results);
});
