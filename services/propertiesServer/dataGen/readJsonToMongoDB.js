let fs = require('fs');
let jsonFile = require('./properties.js');
let importToMongoDB = require('../db/importData.js')

async function read (file) {
  return new Promise(resolve => {
    let header;
    const label = `read2-${file}`;
    console.time(label);
    const stream = fs.createReadStream(file, {encoding: 'utf8'});
    stream.on('data', data => {
      header = data.split(/\n/)[0];
      stream.destroy();
    });
    stream.on('close', () => {
      console.timeEnd(label);
      resolve();
    });
  });
}

async function startTests(files) {
  for (let file of files) {
    console.log(file);
    await read1(file);
    await read2(file);
  }
}

startTests(jsonFile);