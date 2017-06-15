'use strict';

const express = require('express');
const reportRouters = require('./report');

module.exports = function (app, option) {

	const path = ( option && option.path ) ? option.path : "";

	app.use(`${path}/v1/report`, reportRouters);


};