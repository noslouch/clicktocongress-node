var chai = require('chai');
var expect = chai.expect;
var sunlight = require('../lib/clients/sunlight');
var sinon = require('sinon');
var request = require('request');

describe('Sunlight Client', function () {
  it('should make a request to the sunlight api with the correct params', function (done) {
    const LATLNG = {lat: 'foo', lng: 'bar'};
    
    var getSpy = sinon.stub(request, 'get', (a, b) => {
      b(undefined, {}, {});
    });
      
    sunlight.getLegistators(LATLNG).then(res => {
      expect(res).to.deep.equal({});
      expect(getSpy.calledWith({
        url: "https://congress.api.sunlightfoundation.com/legislators/locate",
        qs: {latitude: LATLNG.lat, longitude: LATLNG.lng},
        json: true
      })).to.be.ok;
      
      getSpy.restore();
      done();
    });
  })
})
