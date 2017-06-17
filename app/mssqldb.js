'use strict';

const Connection = require('tedious').Connection;
const Request = require('tedious').Request;


const config = {
    userName: process.env.MSSQL_DB_USER,
    password: process.env.MSSQL_DB_PASS,
    server: process.env.MSSQL_DB_HOST,
    options: {
        database: 'pigeon2',
        useColumnNames: false
    }
};

const connection = new Connection(config);

connection.on('connect', (err) => {
    if (err) {
        reject(Error(err));
    } else {
        console.log("connecting DB");
    }
});


function MSSQLRequest(query) {

	this.request = new Request(query, (err) => {
        if (err) {
            console.log("err:", err);
        }
    });

	this.result=[];

	this.request.on('row', (columns) => {
        let row = {};
        columns.forEach((column) => {
            if (column.value === null) {
                //console.log('NULL');  
            } else {
                row[column.metadata.colName] = column.value;
            }
        });

        this.result.push(row);
    });
};

MSSQLRequest.prototype.query = function() {
    connection.execSql(this.request);
};

module.exports = MSSQLRequest;
