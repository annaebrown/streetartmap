'use strict';
var path = require('path');
var express = require('express');
var app = express();
const Marker = require('../db').Marker
const bodyParser = require('body-parser');

module.exports = app;

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use('/api', require('./api'))

app.get('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, '../browser/index.html'))
})

app.use ((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

Marker.sync({})
  .then(() => {
  	app.listen(3000, () => {
  	 console.log('Server listening on port', 3000);
	 console.log('Oh and btw the postgres server is totally connected, too');
  })
})