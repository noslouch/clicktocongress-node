var express = require('express');
var router = express.Router();
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioLibrary = require('twilio')
const twilioNumber = process.env.TWILIO_NUMBER;
const HOST = process.env.HOST_FOR_TWILIO;
const API_PREFIX = process.env.API_PREFIX;
const client = new twilioLibrary.Twilio(accountSid, authToken);

router.get('/', (req, res) => {
  var queryParams = req.query;
  
  if (!queryParams.dial_out && !queryParams.my_number) {
    return res.send(400);
  }
  
  console.log(`${SCHEME}://${HOST}/api/connect?t=${queryParams.dial_out}`);
  client.calls
    .create({
      url: `${HOST}/${API_PREFIX}/api/connect?t=${queryParams.dial_out}`,
      to: queryParams.my_number,
      from: twilioNumber
    }).then(() => res.send('ok'));
});

module.exports = router;
