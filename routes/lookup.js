var express = require('express');
var router = express.Router();
var googleCivics = require('../lib/clients/google-civics');

function mergeResults(data) {
  return data.offices.reduce(function(transformedOfficials, val) {
    var _officials = val.officialIndices.map(i => data.officials[i]);
    _officials.forEach(o => o.office = val.name);
    return transformedOfficials.concat(_officials);
  }, []);
}

router.get('/', function(req, res) {
  var results;
  var queryParams = req.query;
  if (queryParams.address) {
    googleCivics
      .getReps(queryParams.address)
      .then(mergeResults)
      .then(d => res.send(d))
      .catch(e => res.send(e));
  }
});

module.exports = router;
