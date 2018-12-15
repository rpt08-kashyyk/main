var fs = require('fs');
var csv = require('csv');
var path = require('path');

var dataGenerator = require('./dataGenerator.js');
var importData = require('./importBulkData.js');
var propertyStartData = require('./data.js');
var dataAmenities = require('./../db/amenitiesData.js');

//const writeFile = util.promisify(dataGenerator.writeFile);
//const readdir = util.promisify(fs.readdir);
//const readFile = util.promisify(fs.readFile);
//const produceFilesPromise = util.promisify(produceFiles);
//const saveAmenitiesToPropPromise = util.promisify(importData.saveAmenitiesToProperties);
//const importDataPromise = util.promisify(importData.importAmenities);
//const writeBulkMongoDBPromise = util.promisify(writeBulkMongoDB);

var data = require('./data.js');
CURR_OUTPUT_FILE = importData.writeTofileName(importData.OUTPUT_FILE_NAME);

var main = function() {
  importData.importAmenities(dataAmenities.amenities)
  .then(function() {
    console.log("In saveAmenitiesToProperties");
    importData.saveAmenitiesToProperties(propertyStartData, function() {
      importData.produceFiles(function() {
        importData.writeBulkMongoDB()
      });
    });
  });
  try {
    fs.unlinkFileSync(path.join(__dirname, 'dataWithAmenities.json'));
  } catch(err) {
   console.log("error when deleting file");
  }
}

main();

module.exports = {
  CURR_OUTPUT_FILE: CURR_OUTPUT_FILE
}

  //   //return saveAmenitiesToPropPromise(propertyStartData);
  // importDataPromise(dataAmenities.amenities)
  // .then(function(){
  //   console.log("In saveAmenitiesToProperties")
  //   return saveAmenitiesToPropPromise(propertyStartData);
  // })
  // .then(function(){
  //   console.log("InvproduceFiles");
  //   return produceFilesPromise();
  // })
  // .then(function(){
  //   console.log("In writeToMongo");
  //   return writeBulkMongoDBPromise();
  // })
  // .catch(function(error) {
  //     return console.log(error);
  //   });