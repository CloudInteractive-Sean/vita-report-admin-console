'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _rollupPluginUglify = require('rollup-plugin-uglify');

var _rollupPluginUglify2 = babelHelpers.interopRequireDefault(_rollupPluginUglify);

var _rollupPluginBabel = require('rollup-plugin-babel');

var _rollupPluginBabel2 = babelHelpers.interopRequireDefault(_rollupPluginBabel);

var _rollupPluginEslint = require('rollup-plugin-eslint');

var _rollupPluginEslint2 = babelHelpers.interopRequireDefault(_rollupPluginEslint);

var _rollupPluginNodeResolve = require('rollup-plugin-node-resolve');

var _rollupPluginNodeResolve2 = babelHelpers.interopRequireDefault(_rollupPluginNodeResolve);

var _rollupPluginCommonjs = require('rollup-plugin-commonjs');

var _rollupPluginCommonjs2 = babelHelpers.interopRequireDefault(_rollupPluginCommonjs);

//covert CommonJS Plugin of npm to Babel 


exports.default = {
	entry: 'app.js',
	dest: 'build.js',
	format: 'iife',
	sourceMap: 'inline',
	plugins: [(0, _rollupPluginNodeResolve2.default)({ jsnext: true }), // get module of node_modules 
	(0, _rollupPluginCommonjs2.default)(), // convert commonjs to es6
	(0, _rollupPluginEslint2.default)({
		exclude: ['src/styles/**']
	}), (0, _rollupPluginBabel2.default)({
		exclude: 'node_modules/**' //ignore check node_modules folder
	})
	//uglify()
	]
}; // use npm plguin