var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var express = require('express');
var request = require('supertest');

var app = express();
var connectRoute = require('../routes/connect');
app.use('/connect', connectRoute);

describe('connect route', function () {
  it('should call twilio client with correct args', function(done) {
    const dial_out = '1234567';
    
    request(app)
      .post(`/connect/?t=${dial_out}`)
      .expect('Content-Type', 'text/xml')
      .expect(`<?xml version="1.0" encoding="UTF-8"?><Response><Dial>${dial_out}</Dial></Response>`, done);
  });
});
