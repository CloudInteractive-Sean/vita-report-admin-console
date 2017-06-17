'use strict';

const MSSQLRequest = require('../mssqldb');

function SpecimenNumeric() {
    console.log("SpecimenNumeric");
};

SpecimenNumeric.getList = function (sqlQuery) {

	const column = 'Id as [Id], Label as [Label], Code as [Code], CatalogId as [CatalogId], ProgramId as [assayId]';
	const query = sqlQuery? sqlQuery : `SELECT ${column} FROM SpecimenNumeric`;
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

SpecimenNumeric.getListBySpecimenCatalogId = function (specimenCatalogId) {

    specimenCatalogId = specimenCatalogId ? specimenCatalogId : '';
	const column = 'SpecimenNumeric.Id as [Id], Label as [Label], SpecimenNumeric.Code as [Code], SpecimenNumeric.CatalogId as [CatalogId], SpecimenNumeric.ProgramId as [assayId]';
    const InnerJoin = `INNER JOIN SpecimenCatalog
                         ON SpecimenNumeric.CatalogId = SpecimenCatalog.Id
                         AND SpecimenCatalog.Id = '${specimenCatalogId}'`;
    const query = `SELECT ${column} FROM SpecimenNumeric
                   ${InnerJoin}`;


	return this.getList(query);


}


module.exports = SpecimenNumeric;