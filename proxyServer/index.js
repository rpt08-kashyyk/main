const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const dotenv = require('dotenv').config();

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.route('/api/amenities')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var properties = [];
    request({
      url: process.env.PROPERTY_SERVICE_URL + '/api/amenities/',
      method: 'GET'
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        amenities = JSON.parse(body);
        console.log("in request, amenities");
        result.send(amenities);
      }
  });
});

app.route('/api/properties/property/:propertyId')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var properties = [];
    request({
      url: process.env.PROPERTY_SERVICE_URL + '/api/properties/' + servicePropId,
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        properties = JSON.parse(body);
        console.log("in property route, received results from property service");
        result.send(properties);
      }
  });
});

app.route('/api/properties/property/:propertyId/images')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var images = [];
    console.log("IN GET IMAGES ROUTE!!!", process.env.PROPERTY_SERVICE_URL + '/api/properties/' + servicePropId + '/images');
    request({
      url: process.env.PROPERTY_SERVICE_URL + '/api/properties/' + servicePropId + '/images',
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, body) {
      if (err) {
        console.error(err);
      } else {
        properties = JSON.parse(body);
        console.log("in images request, properties:", properties);
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
        console.log("in reviews route, booking = ", review)
        result.send(review);
      }
  });
});

app.route('/api/calendar/:propertyId')
  .get(function(req, result, next) {
   var booking = [];
   console.log("In calendar, req.params: ", req.params)
    request({
      url: 'http://localhost:8000/api/calendar/' + req.params.propertyId,
      method: 'GET',
      qs: {
        limit: 1
      }
    }, function(err, res, data) {
      if (err) {
        console.log(err);
      } else {
        booking = JSON.parse(data);
        console.log("in calendar route, booking = ", booking)
        result.send(booking);
      }
  });
});

// app.get('*', function(req, res) {
//     console.log("req.url=", req.url)
//     res.redirect(req.url);
// });

app.get('/*', function(req, res) {
  console.log("got to *** request, sending file", path.join(__dirname, '/../client/dist/index.html'));
  res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
});

// app.route('/*')
// .get(function(req,res,next){
//   console.log("got to *** request, sending file", path.join(__dirname, '/../client/dist/index.html'));
//   res.sendFile(path.join(__dirname, '/../client/dist/index.html'), function(err) {
//     if (err) {
//       res.status(500).send(err)
//     }
//   })
// });

app.listen(2000, function() {
  console.log('listening on port 2000!');
});

