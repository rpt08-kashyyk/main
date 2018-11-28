var mongoose = require('mongoose');


var propertySchema = new mongoose.Schema({
propertyID: Number,
lattitude: Number,
longitude: Number,
dailyRent: Number,
cleaningFees: Number,
serviceFees: Number,
taxesAndFees: Number,
randomPriceDeal: String,
existingReservations: [{startDate:Date,endDate:Date}]
});

var PropertyModel = mongoose.model('Property', propertySchema);

// findAll retrieves all stories
function findAll(callback) {
    PropertyModel.find({}, (err, docs) => {
      if (err) throw err;
      callback(docs);
      console.log("FOUND ONE DOCUMENT");
    })

}

// findOne will retrieve the Property associated with the given id
function findOne(callback, id) {
    PropertyModel.find({propertyID: id}, (err, docs)=>{
      if(err) throw err;
      callback(docs);
      console.log("FOUND DOCUMENT FOR ID ", id);
    })
}

// insertOne inserts a Property into the db
function insertOne(callback, Property) {
       PropertyModel.create(Property)
       .then((data) => console.log("INSERTED ONE DOCUMENT"));

}

//insert many documents to db at once
function insertMany(PropertyObjArray) {
    PropertyModel.insertMany(PropertyObjArray)
    .then((data)=>console.log("INSERTED DOCUMENTS ", data.length));
}

exports.findOne = findOne;
exports.findAll = findAll;
exports.insertOne = insertOne;
exports.insertMany = insertMany;

