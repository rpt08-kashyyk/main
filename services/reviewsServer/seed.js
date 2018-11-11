var data = require('./seed_data.js');
var mongoose = require('mongoose');
var db = require('./database-mongo/index.js');

mongoose.connect('mongodb://localhost/fec');

var seedDb = function(data) {
  db.insertOne(data, function(err, data) {
  	if (err) throw err;
  	console.log('success');
  });
};

seedDb(data);