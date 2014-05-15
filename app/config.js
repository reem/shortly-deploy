// var Bookshelf = require('bookshelf');
var path = require('path');
var mongoose = require('mongoose');

mongoose.connect('mongodb:localhost/test');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = db;
