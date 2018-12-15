var fs = require('fs')
var moment = require('moment')


var startTime = new Date().getTime();
var start = {
    "propertyID":0,
    "lattitude":0,
    "longitude":0,
    "dailyRent":100.0,
    "cleaningFees":20,
    "serviceFees":10,
    "taxesAndFees":10,
    "randomPriceDeal":'10% off if you book the entire week',
    "existingReservations": [{"startDate":'2018-11-05',"endDate":'2018-11-10'}]
    };

var idArr = [0]

for(var n=1;n<=100;n++) {
  idArr[n] = idArr[n-1]+100000;
}

for( var k = 0; k < idArr.length; k++) {
    var dataArr = [];
    dataArr.push(start);

    for (var i = idArr[k] ; i < idArr[k+1]; i++) {
      var len = dataArr.length;
      var baseIdx = Math.floor(Math.random()*len) + 0;
      //console.log(i,'-',baseIdx);
      var baseProperty = dataArr[baseIdx];
      var newProperty = {};
      newProperty.propertyID = i;
      newProperty.lattitude = 0;
      newProperty.longitude = 0;
      newProperty.dailyRent = Math.min(baseProperty.dailyRent + Math.floor(Math.random()*10) + 1,1000);
      newProperty.serviceFees = newProperty.dailyRent*0.10
      newProperty.taxesAndFees = newProperty.dailyRent*0.15
      newProperty.randomPriceDeal = baseProperty.randomPriceDeal ;
      //add random booking dates to properties
      newProperty.existingReservations = [] ;
      //number of reservations
      var numReservs = Math.floor(Math.random()*5) + 0;
      if(numReservs > 0) {
        for(var j  = 0; j < numReservs; j++) {
          var reservObj = {};
          if( j === 0) {
            var startDate = moment();
            var randIncrement = Math.floor(Math.random()*90)+1;
            startDate = startDate.clone().add(randIncrement, 'day');
            var stayLength = Math.floor(Math.random()*14) + 1;
            var endDate = startDate.clone().add(stayLength,'day');

          } else {
            var lenReservations = newProperty.existingReservations.length;
            var lastReservation = newProperty.existingReservations[lenReservations-1];
            var startDate = moment(lastReservation.endDate);
            var randIncrement = Math.floor(Math.random()*21)+2;
            startDate = startDate.add(randIncrement,'day');
            var stayLength = Math.floor(Math.random()*14) + 1;
            var endDate = startDate.clone().add(stayLength,'day');
          }
          reservObj['startDate'] = startDate.clone().format();
          reservObj['endDate'] = endDate.clone().format();
          newProperty.existingReservations.push(reservObj);
        }
      }
      dataArr.push(newProperty);
    }


    //write to file
    fs.writeFileSync('../../mockData/calendar/propertyData_'+k+'.json', JSON.stringify(dataArr),'utf8');
    start = dataArr[dataArr.length-1];

}

var endTime = new Date().getTime();
console.log("data generation completed in --",(endTime-startTime)/(60*1000),'-mins');
