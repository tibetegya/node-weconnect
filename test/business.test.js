process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var expect = require('chai').expect

chai.use(chaiHttp);

describe('Businesses', () => {
  it('it fetch businesses', (done) => {
    chai.request(server)
    .get('/api/v1/businesses')
    .end((err, res) => {
      expect(res).to.have.status(200);
      done()
    });
  })
})
