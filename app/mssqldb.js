'use strict';

const Connection = require('tedious').Connection; 
const config = {
	userName: process.env.MSSQL_DB_USER,
	password: process.env.MSSQL_DB_PASS,
	server: process.env.MSSQL_DB_HOST,
	options:{
		database:'pigeon2',
		useColumnNames: false
	}
};


const connection = new Connection(config);
module.exports = connection;








