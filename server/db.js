//server>db.js
const mysql = require("mysql2");

const db = mysql.createConnection({
host: "localhost",
user: "root",
password: "anjali@2320",
database: "quiz_arena"
});

db.connect(err => {
if(err) throw err;
console.log("MySQL Connected");
});

module.exports = db;