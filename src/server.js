'use strict';

require('dotenv').config();

const http = require('http');
const express = require('express');
const routes = require('./app/routes');
const path = require('path');


const app = express();
const exphbs = require('express-handlebars');
app.engine('hbs', exphbs({
	layoutsDir: 'views',
	defaultLayout: 'layout',
	extname: '.hbs'
}));



app.set('port', process.env.PORT || 3005);
app.set('view engine', 'hbs');

console.log(process.env.PORT);

routes(app,{
	path:'/api'
});

app.listen(app.get('port'), () => {
	console.log(`Example app listening on port ${process.env.PORT}!`);
});