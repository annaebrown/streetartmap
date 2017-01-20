'use strict';
var path = require('path');
var express = require('express');
var app = express();
const bodyParser = require('body-parser');

module.exports = app;

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, '../browser/index.html'))
})

app.use ((err, req, res, next) => {
    console.error(err, typeof next);
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.');
});

app.listen(3000, () => {
  console.log('Server listening on port', 3000);
});