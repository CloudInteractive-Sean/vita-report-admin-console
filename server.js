'use strict';

require('dotenv').config();

var http = require('http');
var express = require('express');
var routes = require('./app/routes');
var path = require('path');

var app = express();
var exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
	layoutsDir: 'views',
	defaultLayout: 'layout',
	extname: '.hbs'
}));

app.set('port', process.env.PORT || 3005);
app.set('view engine', 'hbs');

console.log(process.env.PORT);

routes(app, {
	path: '/api'
});

app.listen(app.get('port'), function () {
	console.log('Example app listening on port ' + process.env.PORT + '!');
});