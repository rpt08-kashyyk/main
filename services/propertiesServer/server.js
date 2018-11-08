require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const propDB = require('./db/controllers/properties.js');

const app = express();
const port = process.env.PORT || 3001;

console.log("dirname: ", __dirname);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../dist')));

app.route('/api/properties/:propertyId')
  .get(function(req, res) {
    var propId = req.params.propertyId;
    propDB.getPropertyById( propId )
    .then(function(property){
      res.send(property);
    })
    .catch(function(err){
      console.log("Got to the Properties service!")
      res.status(400);
    })
});

app.route('/api/amenities')
  .get(function(req, res) {
    propDB.getPropertyById( propId )
    .then(function(property){
      res.send(property);
    })
    .catch(function(err){
      console.log("Got to the Properties service!")
      res.status(400);
    })
});

//app.use('/bootstrap', express.static(__dirname + '/../node_modules/bootstrap/dist/css'));
//app.use('/scripts', express.static(__dirname + '/../node_modules'));

// app.use('/api/users', usersRouter);
// app.use('/api/itineraries', itinerariesRouter);



app.listen(port, () => console.log(`Server listening on port ${port}`));