require('dotenv').config();

var express = require('express');
var morgan = require('morgan');
var apiRouter = express.Router();
var app = express();

const apiPrefix = process.env.API_PREFIX || '/';

morgan.token('remote-addr', function (req, res) {
  var realIP = req.headers['x-real-ip'];
  return realIP || req.connection.remoteAddress;
});

apiRouter.use('/', require('./routes/healthcheck'));
apiRouter.use('/v1/lookup', require('./routes/lookup'));
apiRouter.use('/v1/call', require('./routes/call'));
apiRouter.use('/v1/connect', require('./routes/connect'));
app.use(morgan('combined'));
app.use(apiPrefix, apiRouter);

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log('Listening at port %s', port);  
});
