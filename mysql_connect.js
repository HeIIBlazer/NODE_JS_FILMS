const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createPool ({
    host: 'localhost',
    user: 'root',
    database: 'sakila',
    password: ''
});

module.exports = connection;