/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const fetchMyIP = function(callback) {

  request(`https://api.ipify.org?format=json`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    if (error) {
      callback(error, null);
    } else {
      callback(null, ip);
    }

  });
};

const fetchCoordsByIp = (ip, callback) => {

  request(`https://ipvigilante.com/${ip}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates.`;
      callback(Error(msg), null);
      return;
    }
    //console.log(body);
    const coordinates = {};
    //console.log(JSON.parse(body).data.latitude)
    
    coordinates.latitude = JSON.parse(body).data.latitude;
    coordinates.longitude = JSON.parse(body).data.longitude;

    

    if (error) {
      callback(error, null);
    } else {
      callback(null, coordinates);
    }

  });

};

const fetchISSFlyOverTimes = function(coords, callback) {

  request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching flyovers.`;
      callback(Error(msg), null);
      return;
    }
    
    const flyovers = JSON.parse(body).response;
    

    if (error) {
      callback(error, null);
    } else {
      callback(null, flyovers);
    }

  });

};


module.exports = { fetchMyIP,
  fetchCoordsByIp, fetchISSFlyOverTimes };