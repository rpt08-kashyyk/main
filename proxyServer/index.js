const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.route('/api/properties/:propertyId')
  .get(function(req, result, next) {
    let servicePropId = req.params.propertyId;
    var properties = [];
    console.log("propertyId = ", servicePropId);
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

app.route('api/reviews/:propertyId')
  .get(function(req, result, next) {
    console.log("reviews");
});

app.route('api/calendar/:propertyId')
  .get(function(req, result, next) {
    console.log("calendar");
});

app.listen(2000, function() {
  console.log('listening on port 2000!');
});

