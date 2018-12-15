const Json2CsvParser = require('json2csv').Parser;
const fs = require('fs');

for( var k = 18; k < 100; k++) {
/*const start = {
    "propertyID":0,
    "lattitude":0,
    "longitude":0,
    "dailyRent":100.0,
    "cleaningFees":20,
    "serviceFees":10,
    "taxesAndFees":10,
    "randomPriceDeal":'10% off if you book the entire week',
    "existingReservations": [{"startDate":'2018-11-05',"endDate":'2018-11-10'},{"startDate":'2018-11-05',"endDate":'2018-11-10'}]
    };*/
const start = require('../../mockData/calendar/propertyData_'+k+'.json')
const fields = ['propertyID','lattitude','longitude','dailyRent','cleaningFees','serviceFees','taxesAndFees','randomPriceDeal','existingReservations']
const opts = {fields,unwind:['existingReservations']};

try{
  const parser = new Json2CsvParser(opts);
  const csvData = parser.parse(start);
  fs.writeFileSync('../../mockData/calendarCSV/propertyData_'+k+'.csv', csvData,'utf8');

  //console.log(csvData);
} catch(err) {
  console.log("error",err);
}
}