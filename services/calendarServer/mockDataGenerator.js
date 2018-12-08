var fs = require('fs')
var moment = require('moment')

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

for( var k = 0; k < 2; k++) {

    var dataArr = [];
    dataArr.push(start);

    for (var i = 1 ; i < 3; i++) {
      var len = dataArr.length;
      var baseIdx = Math.floor(Math.random()*len) + 0;
      console.log(i,'-',baseIdx);
      var baseProperty = dataArr[baseIdx];
      var newProperty = {};
      newProperty.propertyID = i;
      newProperty.lattitude = 0;
      newProperty.longitude = 0;
      newProperty.dailyRent = baseProperty.dailyRent + Math.floor(Math.random()*10) + 1;
      newProperty.serviceFees = baseProperty.serviceFees + Math.floor(Math.random()*10) + 5;
      newProperty.taxesAndFees = baseProperty.taxesAndFees + Math.floor(Math.random()*10) + 5;
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
    fs.writeFile('../../mockData/calendar/propertyData_'+k+'.json', JSON.stringify(dataArr),'utf8', function(err){
      if (err) throw err;
      console.log('complete');
    });
    start = dataArr[dataArr.length-1];

}


