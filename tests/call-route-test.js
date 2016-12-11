var chai = require('chai');
var expect = chai.expect;
var sinon = require('sinon');
var express = require('express');
var request = require('supertest');

describe('call route', function () {
  const HOST = process.env.HOST_FOR_TWILIO = 'foo.com';
  const SCHEME = process.env.SCHEME_FOR_TWILIO = 'http';
  const TWILIO_NUMBER = process.env.TWILIO_NUMVER = '1234567890';
  var twilio = require('twilio');
  var createStub = sinon.stub();
  createStub.returns(Promise.resolve());
    
  var twilioStub = sinon.stub(twilio, 'Twilio', function() {
      return {
        calls: {
          create: createStub
        }
      }
    });
  
  var app = express();
  var callRoute = require('../routes/call');
  app.use('/call', callRoute);
    
  it('should call twilio client with correct args', function(done) {
    const dial_out = '1234567';
    const to = '7654321';
    
    request(app)
      .get(`/call/?dial_out=${dial_out}&my_number=${to}`)
      .expect(function() {
        expect(createStub.calledWith({
          url: `${SCHEME}://${HOST}/api/connect?t=${dial_out}`,
          to: to,
          from: TWILIO_NUMBER
        }));
        
        twilioStub.restore();
      })
      .expect('ok', done);
  });
});
