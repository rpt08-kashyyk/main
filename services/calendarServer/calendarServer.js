var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var db = require('./propertyDB.js')
var dotenv = require('dotenv').config();


var app = express();

mongoose.connect(DB_CALENDAR_HOST,{useNewUrlParser:true});

app.use(bodyParser.json());


 app.use(express.static(__dirname + '/../dist'));

 app.get('/api/calendar/:propertyID', (req, res) =>{
  db.findOne((data) => {
    //console.log("LOG FROM CALENDAR SERVER : FETCHED DATA FOR ID ", data[0].propertyID);
    res.json(data);
  }, req.params.propertyID);
 });

app.listen(8000, function() {
  console.log('Calendar Service listening on port 8000');
});
