var fs = require('fs');
var csv = require('csv');
var main = require('./dataGenMain')


let currId = 1;
let newFileFlag = true;
 //MB // larger than 1.5G >>>> 1536


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

        if (fileSizeInMB >= maxFileSize && newFileFlag) {
          console.log('filesize: ', fileSizeInMB);
          console.log('MAX_FILE_SIZE: ', maxFileSize);
          currentOutputFile = writeTofileName (outputFileName);
          fs.writeFileSync(currentOutputFile, "[");

        }
      }
      else {
        currentOutputFile = writeTofileName (outputFileName);
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
      //  || (fs.statSync(currentOutputFile).size / 1000000 >= maxFileSize)
      ){
        fs.appendFileSync(currentOutputFile, "]", function (err) {
            if (err) {
                console.error(err);
                return;
            };
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

module.exports = {
  writeTofileName: writeTofileName,
  writeFile: writeFile
}

