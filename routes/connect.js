var express = require('express');
var router = express.Router();
var twilioLib = require('twilio');

router.post('/', (req, res) => {
  var queryParams = req.query;
  var to = queryParams.t;
  
  if (to) {
    var xml = new twilioLib.TwimlResponse();
    xml.dial(to);
    res.writeHead(200, {
      'Content-Type': 'text/xml'
    });
    res.end(xml.toString());
  } else {
    res.sendStatus(400);
  }
});

module.exports = router;
