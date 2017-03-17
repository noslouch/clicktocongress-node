var express = require('express');
var router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;
const HOST = process.env.HOST_FOR_TWILIO;
const API_PREFIX = process.env.API_PREFIX;
const twilioLibrary = require('twilio');
const client = new twilioLibrary.Twilio(accountSid, authToken);

router.get('/', (req, res) => {
  var queryParams = req.query;
  
  if (!queryParams.dial_out && !queryParams.my_number) {
    return res.send(400);
  }
  
  client.calls
    .create({
      url: `${HOST}/${API_PREFIX}/v1/connect?t=${queryParams.dial_out}`,
      to: queryParams.my_number,
      from: twilioNumber
    }).then(() => res.send('ok'));
});

module.exports = router;
