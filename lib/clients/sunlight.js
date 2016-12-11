var request = require('request');

var baseUrl = "https://congress.api.sunlightfoundation.com/";
var path = "legislators/locate";

module.exports.getLegistators = function(latlng) {
  var latitude = latlng.lat;
  var longitude = latlng.lng;
  return new Promise(function(resolve, reject) {
    request.get({
      url: baseUrl + path,
      qs: {latitude, longitude},
      json: true
    }, function(e, r, body) {
      if (r.statusCode >= 400) {
        reject(e);
      } else {
        resolve(body);
      }
    })
  });
}
