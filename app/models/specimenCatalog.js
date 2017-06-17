'use strict';

const MSSQLRequest = require('../mssqldb');

function SpecimenCatelog() {
    console.log("SpecimenCatelog");
};

SpecimenCatelog.getList = function (sqlQuery) {

	const column = 'Id as [Id], Name as [Name], Code as [Code]';
	const query = sqlQuery ? sqlQuery : `SELECT ${column} FROM SpecimenCatalog`;
    const requestInstant = new MSSQLRequest(query);

    return new Promise((resolve, reject) => {

        requestInstant.request.on('doneProc', (rowCount, more) => {
            resolve(requestInstant.result);
        });

        requestInstant.request.on('doneInProc', () => {
        	console.log("Close the connection");
        })

        requestInstant.query();
    });
};

SpecimenCatelog.getListByNumericBundleId = function (numericBundleId) {

    numericBundleId = numericBundleId ? numericBundleId : '';
	const column = 'SpecimenCatalog.Id as [Id], SpecimenCatalog.Name as [Name], SpecimenCatalog.Code as [Code]';
    const InnerJoin = `INNER JOIN NumericBundleCatalog
                         ON SpecimenCatalog.Id = NumericBundleCatalog.CatalogId
                         AND NumericBundleCatalog.bundleId = '${numericBundleId}'`;
    const query = `SELECT ${column} FROM SpecimenCatalog
                   ${InnerJoin}`;

    return this.getList(query);

};


module.exports = SpecimenCatelog;
