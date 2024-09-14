require("dotenv").config();
let mysql = require("mysql2");
let migration =  require("mysql-migrations");

let conn = mysql.createPool({
	connectionLimit: 10,
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	database: process.env.MYSQL_DATABASE,
	password: process.env.MYSQL_PASSWORD
});

migration.init(conn, __dirname + "/migrations");
