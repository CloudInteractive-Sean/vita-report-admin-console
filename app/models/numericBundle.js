'use strict';

const MSSQLRequest = require('../mssqldb');

function NumericBundle() {
    console.log("NumericBundle");

};


NumericBundle.getList = function(sqlQuery) {

	const column = 'Id as [id], Label as [label], Title as [title]';
	const query = sqlQuery? sqlQuery : `SELECT ${column} FROM NumericBundle`;
    const requestInstant = new MSSQLRequest(query);

    return new Promise((resolve, reject) => {
        
        requestInstant.request.on('doneProc', (rowCount, more) => {
            resolve(requestInstant.result);
        });

        requestInstant.request.on('doneInProc', () => {
        	console.log("Close the connection");
        });

        requestInstant.query();

    });

};



module.exports = NumericBundle;
