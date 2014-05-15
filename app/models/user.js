var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
  username: String,
  password: String
});

userSchema.methods.hashPassword = function () {
  var cipher = Promise.promisify(bcrypt.hash);
  return cipher(this.password, null, null).bind(this)
    .then(function(hash) {
      this.password = hash;
    });
};

userSchema.methods.comparePassword = Promise.promisify(function (attempt, callback) {
  bcrypt.compare(attempt, this.password, function(err, isMatch) {
    callback(isMatch);
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
