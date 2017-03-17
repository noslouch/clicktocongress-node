var chai = require('chai');
var expect = chai.expect;
var lookupRoute = require('../routes/lookup');
var sinon = require('sinon');
var express = require('express');
var request = require('supertest');

var googleCivics = require('../lib/clients/google-civics');
var REPS_RESPONSE = require('./fixtures/representatives');
var fromGoogle = {
  offices: REPS_RESPONSE.offices.slice(0, 3),
  officials: REPS_RESPONSE.officials.slice(0, 4)
};

var expecting = [{
   "id": 0,
   "name": "Donald J. Trump",
   "office": "President of the United States",
   "party": "Republican",
   "phones": [
    "(202) 456-1111"
  ],
   "divisionId": "ocd-division/country:us"
  },
  {
   "id": 1,
   "name": "Mike Pence",
   "party": "Republican",
   "office": "Vice-President of the United States",
   "phones": [
    "(202) 456-1111"
  ],
   "divisionId": "ocd-division/country:us"
  },
  {
   "id": 2,
   "name": "Charles E. Schumer",
   "office": "United States Senate",
   "party": "Democratic",
   "phones": [
    "(202) 224-6542"
  ],
   "divisionId": "ocd-division/country:us/state:ny"
  },
  {
   "id": 3,
   "name": "Kirsten E. Gillibrand",
   "office": "United States Senate",
   "party": "Democratic",
   "phones": [
    "(202) 224-4451"
  ],
   "divisionId": "ocd-division/country:us/state:ny"
}];
var googleStub;

var app = express();
app.use('/lookup', lookupRoute);

describe('lookup route', function () {
  const ADDRESS = "123 Main St, Anytown, OH";
  
  beforeEach(function () {
    googleStub = sinon.stub(googleCivics, 'getReps', () => Promise.resolve(fromGoogle));
  });
  afterEach(function() {
    googleCivics.getReps.restore();
  });
  
  it('should return merged objects from the google API', function (done) {
    
    request(app)
      .get(`/lookup/?address=${ADDRESS}`)
      .expect(function () {
        expect(googleStub.calledWith(ADDRESS)).to.be.ok;
      })
      .expect(200, expecting, done);
  });
});
