
const express = require('express')
const router = express.Router();
const db = require('../db');
const Marker = db.Marker;

router.get('/', (req, res, next) => {
	Marker.findAll({})
	.then(markers => {
		res.send(markers)
	})
	.catch(next)
})

router.post('/', (req, res, next) => {
	console.log('body', req.body)
	Marker.create(req.body)
	.then(marker => {
		return Promise.all(Marker.findAll({}))
	})
	.then(markers => {
		res.send(markers)
	})
	.catch(next)
})

module.exports = router;