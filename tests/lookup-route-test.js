var chai = require('chai');
var expect = chai.expect;
var lookupRoute = require('../routes/lookup');
var sinon = require('sinon');
var express = require('express');
var request = require('supertest');

var googleMaps = require('../lib/clients/google-maps');
var sunlight = require('../lib/clients/sunlight');
var googleStub;
var sunlighStub;

var app = express();
app.use('/lookup', lookupRoute);

describe('lookup route', function () {
  const ZIP = '12345';
  const data = 'foo';
  const LATLNG = 'latlong';
  const LAT = 'lat';
  const LNG = 'lng';
  
  beforeEach(function () {
    googleStub = sinon.stub(googleMaps, 'lookup', () => Promise.resolve(LATLNG));
    sunlightStub = sinon.stub(sunlight, 'getLegistators', () => Promise.resolve({data}));
  });
  afterEach(function() {
    googleMaps.lookup.restore();
    sunlight.getLegistators.restore();
  });
  
  it('should call google lookup and then getLegistators if given a zip', function (done) {
    
    request(app)
      .get(`/lookup/?zip=${ZIP}`)
      .expect(function () {
        expect(googleStub.calledWith(ZIP)).to.be.ok;
        expect(sunlightStub.calledWith(LATLNG)).to.be.ok;
      })
      .expect(200, {
        data
      }, done)
  });
  
  it('should call getLegistators if given a zip', function (done) {
    
    request(app)
      .get(`/lookup/?lat=${LAT}&lng=${LNG}`)
      .expect(function () {
        expect(sunlightStub.calledWith({lat: LAT, lng: LNG})).to.be.ok;
        sinon.assert.notCalled(googleStub);
      })
      .expect(200, {
        data
      }, done)
  });
});
