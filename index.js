require('dotenv').config();

var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.options('*', cors());

app.use('/api/lookup', require('./routes/lookup'));
app.use('/api/call', require('./routes/call'));
app.use('/api/connect', require('./routes/connect'));

var server = app.listen(3000, function () {
  var port = server.address().port;
  console.log('Listening at port %s', port);  
});

module.exports = server;
