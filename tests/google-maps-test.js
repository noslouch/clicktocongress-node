var chai = require('chai');
var expect = chai.expect;
var googleMaps = require('../lib/clients/google-maps');
var sinon = require('sinon');
var request = require('request');

describe('Google Maps Client', function () {
  it('should make a request to google maps with the given zip', function (done) {
    const ZIP = '12345';
    const LATLNG = {lat: 'foo', lng: 'bar'};
    
    var getSpy = sinon.stub(request, 'get', (a, b) => {
      b(undefined, {}, {
        results: [{
          geometry: {
            location: LATLNG
          }
        }]
      });
    });
      
    googleMaps.lookup(ZIP).then(latlng => {
      expect(latlng).to.deep.equal(LATLNG);
      expect(getSpy.calledWith({
        url: "http://maps.googleapis.com/maps/api/geocode/json",
        qs: {address: ZIP},
        json: true
      })).to.be.ok;
      
      getSpy.restore();
      done();
    });
  })
})
