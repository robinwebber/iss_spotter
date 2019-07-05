const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');


const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  
  printPassTimes(passTimes);
});


// const sample = {
//   latitude: 43.63190,
//   longitude: -79.3716
// };


// fetchISSFlyOverTimes(sample, (error, output) => {
  
//   if (error) {
//     console.log("It didn't work!");
//     return;
//   } else {
//     console.log('It worked! Returned Flyovers:' , output);

//   }
    

// });

// fetchCoordsByIp('67.71.216.6', (error, output) => {
  
//   if (error) {
//     console.log("It didn't work!");
//     return;
//   } else {
//     console.log('It worked! Returned Coordinates:' , output);

//   }
    

// });


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });