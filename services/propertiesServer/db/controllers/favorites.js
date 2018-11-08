var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
var db = require('../index.js');


var getProperties = function() {
  return new Promise(function(resolve, reject) {
    db.Property.find().exec()
      .then(function(props) {
        console.log("Properties controller, props = ", props)
        resolve(props);
      })
      .catch(function(err) {
        reject(err);
      });
  });
};