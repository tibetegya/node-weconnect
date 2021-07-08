process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../models/user');
let Account = require('../models/accountVerify');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
var expect = require('chai').expect

chai.use(chaiHttp);

describe('Users', () => {

  let user1 = {
    username: "tibzeee",
    firstName: "joje",
    email:"joje@gmail.com",
    password: "george",
    lastName: "tibetegya",
    profilePhoto: "url/to/pic",
    bio: "this is a great guy",
    interests: ["dancing"]
  }
  let user2 = {
    username: "seconUser",
    firstName: "second",
    email:"second@gmail.com",
    password: "george",
    lastName: "user",
    profilePhoto: "url/to/pic",
    bio: "this is a great guy",
    interests: ["dancing"]
  }
  describe('Users', () => {

  beforeEach((done) => {
    User.remove({}, (err) => {
       done();           
    });       
  });
    it('it should register a user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done()
      });
    })
    
    it('it should not register a duplicate user', (done) => {
      let user3 = user1
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        chai.request(server)
        .post('/api/v1/auth/register')
        .send(user3)
        .end((err, res) => {
          expect(res).to.have.status(403);
          done()
        });
      });
    })
    it('it should login a user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        User.updateOne({ username: user1.username },{ isVerified: true }, (err) => {

          chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            username: user1.username,
            password: user1.password
          })
          .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body).to.have.property('token');
            done()
          });
        });
      });
    })

    it('it should access protected route', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        User.updateOne({ username: user1.username },{ isVerified: true, isAdmin: true }, (err) => {

          chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            username: user1.username,
            password: user1.password
          })
          .end((err, res) => {
            const authToken = 'Bearer '+res.body.token
            chai.request(server)
            .get('/api/v1/auth/')
            .set('Authorization', authToken)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done()
            });
          });
        });
      });
    })


    // it('it should reset a password', (done) => {
    //   chai.request(server)
    //   .post('/api/v1/auth/register')
    //   .send(user1)
    //   .end((err, res) => {
    //     chai.request(server)
    //     .post('/api/v1/auth/reset-password')
    //     .send({ email: user1.email })
    //     .end((err, res) => {
    //       expect(res).to.have.status(200);
    //       done()
    //     });
    //   });
    // })

    it('it should logout a user', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        User.updateOne({ username: user1.username },{ isVerified: true, isAdmin: true }, (err) => {

          chai.request(server)
          .post('/api/v1/auth/login')
          .send({
            username: user1.username,
            password: user1.password
          })
          .end((err, res) => {
            const authToken = 'Bearer '+res.body.token
            chai.request(server)
            .get('/api/v1/auth/logout')
            .set('Authorization', authToken)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done()
            });
          });
        });
      });
    })
  })
  describe('Check verification', () =>{
    it('it should verify account', (done) => {
      chai.request(server)
      .post('/api/v1/auth/register')
      .send(user1)
      .end((err, res) => {
        Account.find({}, (err, acc) => {
          chai.request(server)
          .get('/api/v1/auth/verify-account/'+acc[acc.length-1].verifyId)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done()
          });
        });
      });
    })
  })
})