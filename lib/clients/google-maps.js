var request = require('request');

var baseUrl = "http://maps.googleapis.com/";
var path = "maps/api/geocode/json";

module.exports.lookup = function(zip) {
  return new Promise((resolve, reject) => {
    request.get({
      url: baseUrl + path,
      qs: {address: zip},
      json: true
    }, function(e, r, body) {
      if (r.statusCode >= 400) {
        reject(e);
      } else {
        var latlng = body.results[0].geometry.location;
        resolve(latlng);
      }
    });
  });
};
