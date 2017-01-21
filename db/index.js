var Sequelize = require('sequelize');

var db = new Sequelize('postgres://localhost:5432/stackathon', { 
    logging: false 
})

var Marker = db.define('marker', {
	latitude: {
		type: Sequelize.INTEGER
	},
	longitude: {
		type: Sequelize.INTEGER
	},
	infoContent: {
		type: Sequelize.TEXT
	},
	hasContent: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	}
})

module.exports = Marker;