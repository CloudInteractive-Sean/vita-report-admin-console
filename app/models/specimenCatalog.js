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

function SpecimenCatelog() {
    console.log("SpecimenCatelog");
};

SpecimenCatelog.getList = function (sqlQuery) {

	const column = 'Id as [Id], Name as [Name], Code as [Code]';
	let query = `SELECT ${column} FROM SpecimenCatalog`;

	if (sqlQuery) {
		query = sqlQuery
	};

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
        })

        msdb.execSql(request);

    });
};

SpecimenCatelog.getListByNumericBundleId = function (numericBundleId) {

    numericBundleId = numericBundleId ? numericBundleId : '';
	const column = 'SpecimenCatalog.Id as [Id], SpecimenCatalog.Name as [Name], SpecimenCatalog.Code as [Code]';
    const InnerJoin = `INNER JOIN NumericBundleCatalog
                         ON SpecimenCatalog.Id = NumericBundleCatalog.CatalogId
                         AND bundleId = '${numericBundleId}'`;
    const query = `SELECT ${column} FROM SpecimenCatalog
                   ${InnerJoin}`;

    console.log(query);

	return this.getList(query);


}


module.exports = SpecimenCatelog;
