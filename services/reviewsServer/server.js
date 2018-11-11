var express = require('express');
var bodyParser = require('body-parser');
var db = require('./index.js');

var app = express();

app.use(express.static(__dirname + '/../../react-client/dist'));

app.get('/data', function (req, res) {
  db.selectAll(function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

// app.route('/api/reviews/:id')
//   .get(function(req, res) {
//   db.selectId(req.params.id, function (err, data) {
//     if (err) {
//       console.log(err);
//     }
//     res.send(data);
//   });
// });

app.get('/data/:id', function (req, res) {
	db.selectId(req.params.id, function (err, data) {
		if (err) {
			console.log(err);
		}
  	res.send(data);
	});
});

app.get('/comments/:query', function (req, res) {
  db.searchComments(req.params.query, function (err, data) {
    if (err) {
      console.log(err);
    }
    res.send(data);
  });
});

// app.get('/property/:id', function (req, res) {
//   db.selectProperty((data) => {
//     res.send(req.params.id);
//   })
// });

app.listen(3002, function() {
  console.log('listening on port 3002!');
});

