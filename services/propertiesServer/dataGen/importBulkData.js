var mongoose = require('mongoose');
var db = require('../db/index.js');
var Promise = require('bluebird');
var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var execSync = require('child_process').execSync;
var limitedData = require('./data.js');
var dataGenerator = require('./dataGenerator.js');


mongoose.Promise = require('bluebird');
var path = require('path');
//var dataProperties = require('./jsons/data.js');
var dataAmenities = require('../db/amenitiesData.js');

const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);

let MAX_FILE_SIZE = 800; //MB
let OUTPUT_FILE_NAME = 'properties';
let MAX_ITERATIONS = 500000;
let CURR_OUTPUT_FILE = '';

let currId = 1;
let newFileFlag = true;

var writeTofileName = function (filename) {
  return ("./jsons/" + filename + new Date().getTime().toString() + ".js")
};

var writeFile = function(dataFile, maxIterations, maxFileSize, outputFileName, cb){

  var currentOutputFile = "";
  console.log("dataFile lenght: ", dataFile.length);
  for (let i=0; i <= maxIterations; i++){
    for (var j = 0; j < dataFile.length; j++){
      dataFile[j].id = currId;
      if (fs.existsSync(currentOutputFile)) {
        var stats = fs.statSync(currentOutputFile);
        var fileSizeInMB = stats["size"] / 1000000;

        if (fileSizeInMB >= maxFileSize || newFileFlag) {
          console.log('filesize: ', fileSizeInMB);
          console.log('MAX_FILE_SIZE: ', maxFileSize);
          currentOutputFile = writeTofileName (outputFileName);
          newFileFlag = false;
          fs.writeFileSync(currentOutputFile, "[");
        }
      }
      else {
        currentOutputFile = writeTofileName (outputFileName);
        newFileFlag = false;
        fs.writeFileSync(currentOutputFile, "[");
      }

      // if (newFileFlag)
      //   newFileFlag = false;
      //   fs.appendFileSync(currentOutputFile, "[", function (err) {
      //       if (err) {
      //           console.error(err);
      //           return;
      //       };
      //   });

      fs.appendFileSync(currentOutputFile, JSON.stringify(dataFile[j]), function (err) {
          if (err) {
              console.error(err);
              return;
          };
          //console.log("File has been written");
      });

      if ((i === maxIterations && j === dataFile.length-1)
        || (fs.statSync(currentOutputFile).size / 1000000 >= maxFileSize)
      ){
        fs.appendFileSync(currentOutputFile, "]", function (err) {
            if (err) {
                console.error(err);
                return;
            };
            newFileFlag = true;
            console.log("appended ]");
        });
      } else {
        fs.appendFileSync(currentOutputFile, ",", function (err) {
            if (err) {
                console.error(err);
                return;
            };
            console.log("appended , ");
        });
      }
      currId++;
    }
  }
  cb();
}

let importAmenities = function(amenities) {
  console.log('importAmenities');
  var saves = [];
  for (const amenity of amenities) {
    var promise = new Promise(function(resolve, reject) {
    //  amenity._id = mongoose.Types.ObjectId(amenity._id)
      db.Amenities.create(amenity, function(err, entry) {
        if (err) {
          console.log ("cannot save ", err);
          reject (err);
        }
          resolve(entry);
        });
    });
    saves.push(promise);
  }
  return new Promise.all(saves);
};

let importProperties = function(properties) {
  var saves = [];
  for (var property of properties){
  //  property._id = mongoose.Types.ObjectId(property._id)
    var promise = new Promise(function(resolve, reject){
      db.Property.create(property ,function(err,entry){
        if (err) {
          console.log("Error saving property - ", err);
          reject(err);
        }
        resolve(entry);
      });
    });
    saves.push(promise);
  }
  return new Promise.all(saves);
};


saveAmenitiesToProperties = function(propertyData, cb) {
  console.log('saveAmenitiesToProperties: start');
  db.Amenities.find({'id': { $in: [1, 2, 3, 5, 6, 7, 8, 9, 11, 12, 13, 15, 17, 18, 19, 20, 22]}},
    function(err, entries){
      if (err) {
        console.log('saveAmenitiesToProperties: error finding amenities, ', err);
        return err;
      }
      var _ids = [];
      entries.forEach(function(entry) {_ids.push(entry._id)});
      fs.writeFile('dataWithAmenities.json', '[', function (err) {
        if (err) {
            console.error("Err write dataWithAmenities: ", err);
            return;
        } else {
          console.log("Properties length: ", propertyData.properties.length);

          for (var i = 0; i < propertyData.properties.length; i++){
            propertyData.properties[i].amenities = _ids.slice(0, 17);
            var dataToAppend = (i === propertyData.properties.length-1) ? JSON.stringify(propertyData.properties[i]) :
            JSON.stringify(propertyData.properties[i]) + ",";
            fs.appendFileSync('dataWithAmenities.json', dataToAppend);
          }
          fs.appendFileSync(path.join(__dirname, 'dataWithAmenities.json'), ']');
          cb();
      };
    });
  });
}

function produceFiles(cb) {
  var readData = fs.readFileSync(path.join(__dirname, 'dataWithAmenities.json'), {encoding: 'utf8'});
  console.log(JSON.parse(readData));
  // readData = eval(readData);
  console.log("In produceFile");
  writeFile(JSON.parse(readData), MAX_ITERATIONS, MAX_FILE_SIZE, OUTPUT_FILE_NAME, cb);
}

function writeBulkMongoDB() {
  var dataDir = path.join(__dirname, 'jsons');

  readdir(dataDir).then(files => {
    //for(var i = 0; i < 20; i++){
      files.forEach(file => {
        var filePath = path.join(dataDir, file)
        let command = 'mongoimport -d firebnb -c properties --jsonArray --file ' + filePath;
        console.log("writeBulkMongoDB, command = ", command);
        execSync(command, (err, stdout, stderr) => {
          if (err) {
            console.log('error writing file to MongoDb: ', err);
            return err;
          }
          console.log('finished loading into MongoDB: ', filePath)
        });
      });
    //}
  });
}

setTimeout(function(){ console.log("Hello"); }, 3000);

module.exports = {
  importAmenities: importAmenities,
  importProperties: importProperties,
  saveAmenitiesToProperties: saveAmenitiesToProperties,
  produceFiles: produceFiles,
  writeBulkMongoDB: writeBulkMongoDB,
  OUTPUT_FILE_NAME: OUTPUT_FILE_NAME,
  writeTofileName: writeTofileName,
  writeFile: writeFile
}

// importAmenities(dataAmenities.amenities)
//   .then(function(amenitiesEntry) {
//     console.log('saved amenities');
//     saveAmenitiesToProperties()
//   })
//   .then(function(){

//   })
//   .catch(function(error) {
//     return console.error(error);
//   });



  //   var dataDir = path.join(__dirname, 'jsons');
  //   ///
  //   readdir(dataDir).then(files => {

  //     files.forEach(file => {
  //           importProperties(dataProperties.properties)
  //     })
  //   });
  //   //  return importProperties(dataProperties.properties)
  //  })
  //  .then(function(){
  //     //saveAmenitiesToProperties()
  //   })
  //  // .then(function(){
  //  //    mongoose.disconnect()
  //  // })
  // .catch(function(error) {
  //   return console.error(error);
  // });
