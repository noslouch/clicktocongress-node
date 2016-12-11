var express = require('express');
var router = express.Router();
var googleMaps = require('../lib/clients/google-maps');
var sunlight = require('../lib/clients/sunlight');

function lookupByZip(zip) {
  return googleMaps.lookup(zip)
    .then(ll => sunlight.getLegistators(ll));
}

router.get('/', function(req, res) {
  var results;
  var queryParams = req.query;
  if (queryParams.zip) {
    lookupByZip(queryParams.zip).then(r => res.send(r));
  } else if (queryParams.lat && queryParams.lng) {
    sunlight.getLegistators(queryParams).then(r => res.send(r));
  }
});

module.exports = router;
