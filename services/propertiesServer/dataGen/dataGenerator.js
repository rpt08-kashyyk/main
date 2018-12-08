var data = require('./data.js');
var fs = require('fs');
var csv = require('csv');


// data.forEach((d) => {
//       const row = []; // a new array for each row of data
//       row.push(d.state);
//       row.push(d.capital);
//       row.push(d.population);

//       output.push(row.join()); // by default, join() uses a ','
//     });

//     fs.writeFileSync(filename, output.join(os.EOL));

var currId = 1;
var maxIterations = 100;
var outputFileName = "propertiesSample";

let writeTofileName = function (filename) {
  return ("./" + filename + new Date().getTime().toString() + ".js")
}

let writeFile = function(dataFile, currId, maxIterations, outout){

  for (let i=0; i <= maxIterations; i++){
    //console.log("length: ", dataFile.properties.length);
    for (var j = 0; j < dataFile.properties.length; j++){
      dataFile.properties[j].id = currId;
      //console.log("id = ", dataFile.properties[j].id);

      var stats = fs.statSync(currentOutputFile);
      var fileSizeInMB = stats["size"] / 1000000;
      if (fileSizeInMB > 1) { // larger than 1.5G 1536
        currentOutputFile = writeTofileName (outputFileName);
      }

      fs.appendFileSync(currentOutputFile, JSON.stringify(dataFile.properties[j]), function (err) {
          if (err) {
              console.error(err);
              return;
          };
          //console.log("File has been written");
      });
      if (i === maxIterations && j === dataFile.properties.length-1) {
        fs.appendFileSync(currentOutputFile, "]", function (err) {
            if (err) {
                console.error(err);
                return;
            };
            console.log("appended , ");
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
}
//////////////////////////////////////////////////////////
////////////////////    main    //////////////////////////

var currentOutputFile = writeTofileName(outputFileName);

try {
  fs.unlinkFileSync(currentOutputFile);
} catch(err) {
  console.log("error when deleting file");
}

fs.appendFileSync(currentOutputFile, "module.exports.properties = [", function (err) {
          if (err) {
              console.error(err);
              return;
          };
          //console.log("File has been written");
});

writeFile(data, currId, maxIterations, currentOutputFile);