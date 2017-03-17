var chai = require('chai');
var expect = chai.expect;
var googleCivics = require('../lib/clients/google-civics');
var sinon = require('sinon');
var request = require('request');
var REPS_RESPONSE = require('./fixtures/representatives');

describe('Google Civics API Client', function() {
  it('should make a request to google civics with the given address', function(done) {
    const ADDRESS = "123 Main St, Anytown, OH";
    
    var getSpy = sinon.stub(request, 'get', (a, b) => {
      b(undefined, {}, REPS_RESPONSE);
    });
    
    googleCivics.getReps(ADDRESS).then(res => {
      expect(res).to.deep.equal(REPS_RESPONSE);
      expect(getSpy.calledWith({
        url: "https://www.googleapis.com/civicinfo/v2/representatives",
        qs: {
          key: process.env.GOOGLE_API_KEY,
          address: ADDRESS,
          fields: 'offices(name,officialIndices,divisionId),officials(name,party,phones)'
        },
        json: true,
        timeout: 5000
      })).to.be.ok;
      
      getSpy.restore();
      done();
    });
      
  });
});
