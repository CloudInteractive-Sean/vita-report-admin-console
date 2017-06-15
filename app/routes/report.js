'use strict';

const express = require('express');
const NumericBundle = require('../models/numericBundle');
const SpecimenCatalog = require('../models/specimenCatalog')
const router = express.Router();


const numericBundle = new NumericBundle();
const specimenCatalog = new SpecimenCatalog();


router.get('/', (req, res) => {
	res.send('report API');
});


router.get('/numericBundle/list', (req, res) => {
	NumericBundle.getList()
		.then((data)=>{
			res.send(data);
		})
});

router.get('/numericBundle/:numericBundleId/specimenList', (req, res) => {
	const numericBundleId = req.params.numericBundleId;
	SpecimenCatalog.getListByNumericBundleId(numericBundleId)
		.then((data)=>{
			res.send(data);
		})
});


router.get('/specimenCatalog/list', (req, res) => {
	SpecimenCatalog.getList()
		.then((data)=>{
			res.send(data);
		})
});










module.exports = router;

