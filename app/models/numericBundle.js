'use strict';

const msdb = require('../mssqldb');
const Request = require('tedious').Request;



msdb.on('connect', (err) => {
    if (err) {
        reject(Error(err));
    } else {
        console.log("connecting DB");
    }
});


function NumericBundle() {
    console.log("NumericBundle");
};


NumericBundle.getList = function(queryOption) {

	const column = 'Id as [Id], Label as [Label], Title as [Title]';
	const query = `SELECT ${column} FROM NumericBundle`;
    const request = new Request(query, (err) => {
        if (err) {
            console.log("err:", err);
        }
    });

    let result = [];

    request.on('row', (columns) => {
    	let row = {};
        columns.forEach((column) => {
            if (column.value === null) {
                //console.log('NULL');  
            } else {
            	row[column.metadata.colName] = column.value;
            }
        });
        result.push(row);
    });


    return new Promise((resolve, reject) => {

        request.on('doneProc', (rowCount, more) => {
            resolve(result);
        });

        request.on('doneInProc', () => {
        	console.log("Close the connection");
        });

        msdb.execSql(request);


    });

};



module.exports = NumericBundle;
