var request = require('request');

var baseUrl = 'https://www.googleapis.com';
var path = 'civicinfo/v2/representatives';
var fields = 'offices(name,officialIndices),officials(name,party,phones)';

module.exports.getReps = function(address) {
  return new Promise((resolve, reject) => {
    request.get({
      url: `${baseUrl}/${path}`,
      qs: {
        key: process.env.GOOGLE_API_KEY,
        address: address,
        fields 
      },
      json: true,
      timeout: 5000
    }, function(e, r, body) {
      if (r.statusCode >= 400) {
        reject(body);
      } else {
        resolve(body);
      }
    });
  });
};
