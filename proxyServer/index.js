const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));


app.route('/api/properties/property/:propertyId')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var properties = [];
    request({
      url: 'http://localhost:3001/api/properties/' + servicePropId,
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        console.log("Got results from 3001");
        properties = JSON.parse(body);
        console.log("in request, properties:", properties);
        result.send(properties);
      }
  });
});

app.route('/api/properties/property/:propertyId/images')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var images = [];
    request({
      url: 'http://localhost:3001/api/properties/' + servicePropId + '/images',
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        console.log("Got results from 3001");
        properties = JSON.parse(body);
        console.log("in request, properties:", properties);
        result.send(properties);
      }
  });
});

// app.route('api/reviews/:propertyId')
//   .get(function(req, result, next) {
//     console.log("reviews");
// });

app.route('/api/reviews/:propertyId')
  .get(function(req, result, next) {
    var review = [];
    request({
      url: 'http://localhost:3002/data/' + req.params.propertyId,
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, data) {
      if (err) {
        console.log(err);
      } else {
        review = JSON.parse(data);
        result.send(review);
      }
  });
});

app.route('api/calendar/:propertyId')
  .get(function(req, result, next) {
    console.log("calendar");
});

app.get('*', function(req, res) {
    res.redirect('/');
});

app.listen(2000, function() {
  console.log('listening on port 2000!');
});

