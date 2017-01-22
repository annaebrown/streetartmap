
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
	Marker.findOrCreate({
		where: { 
			latitude: req.body.latitude, 
			longitude: req.body.longitude 
		}
	})
	.then(marker => {
		return Marker.findAll({})
	})
	.then(markers => {
		res.send(markers)
	})
	.catch(next)
})

router.put('/', (req, res, next) => {
	Marker.findOne({
		where: {
			id: req.body.id
		}
	})
	.then((marker) => {
		marker.update({
			content: req.body.content
		})
	})
	.then((updatedMarker) => {
		Marker.findAll({})
	})
	.then((markers) => {
		res.send(markers)
	})
	.catch(next)
})

module.exports = router;
