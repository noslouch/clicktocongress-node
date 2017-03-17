var express = require('express');
var router = express.Router();
var googleCivics = require('../lib/clients/google-civics');

function mergeResults(data) {
  return data.offices.reduce(function(transformedOfficials, val) {
    var _officials = val.officialIndices.map(i => data.officials[i]);
    _officials.forEach((o, i) => {
      o.divisionId = val.divisionId;
      o.office = val.name;
    });
    return transformedOfficials.concat(_officials);
  }, []);
}

function idResults(data) {
  data.forEach((d, i) => d.id = i);
  return data;
}

router.get('/', function(req, res) {
  var results;
  var queryParams = req.query;
  if (queryParams.address) {
    googleCivics
      .getReps(queryParams.address)
      .then(mergeResults)
      .then(idResults)
      .then(d => res.send(d))
      .catch(e => res.send(e));
  } else {
    res.status(400).send({
      error: {
        code: 400,
        message: "Address is required"
      }
    });
  }
});

module.exports = router;
