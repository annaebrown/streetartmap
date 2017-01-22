var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/stackathon')

var Marker = db.define('marker', {
	latitude: {
		type: Sequelize.DECIMAL
	},
	longitude: {
		type: Sequelize.DECIMAL
	},
	content: {
		type: Sequelize.TEXT
	}
})

module.exports = {Marker};