var mongoose = require('mongoose');
var Promise = require('bluebird');
mongoose.Promise = require('bluebird');
var db = require('../index.js');

//get a list of amenities

getAmenities = function () {
  return new Promise(function(resolve,reject){
    db.Amenities.find().exec()
     .then(function(amenities) {
        console.log("Properties controller, amenities = ", amenities)
        resolve(amenities);
      })
      .catch(function(err) {
        reject(err);
      });
  })
}


module.exports = {
  getAmenities: getAmenities
};
