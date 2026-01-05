const mysql = require('mysql2');
const { DatabaseSync } = require('node:sqlite');

const config = {
    host: 'localhost',
    user: 'root',
    password: 'oitmis',
    database: 'shopping'
};
const connection = mysql.createConnection(config);

connection.connect();

const sql = 'SELECT * FROM products';

connection.query(sql, (error, results, fields) => {
    if (error) throw error;

    console.log(results);
});
connection.end();