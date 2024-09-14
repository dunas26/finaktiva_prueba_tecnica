import mysql from "mysql2/promise";

export const setupMysql = () => {
	const connection = mysql.createPool({
		connectionLimit: 10,
		host: process.env.MYSQL_HOST,
		user: process.env.MYSQL_USER,
		database: process.env.MYSQL_DATABASE,
		password: process.env.MYSQL_PASSWORD,
	});

	return {
		connection
	}
};
