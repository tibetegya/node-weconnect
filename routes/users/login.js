const bcrypt = require('bcrypt');

const { User } = require('../../models');
const response = require('../../utils/response');
const createToken = require('../../utils/createToken')

module.exports = function(req, res, next) {
  const loginData = req.body;
  User
  .findOne({ username: loginData.username },
  function(err, existingUsers){
    if (existingUsers){
      bcrypt.compare(loginData.password, existingUsers.password, function(err, pass) {
      if (!pass){
        response({
          res,
          code: 400,
          message:`Password does not match`,
          details: `Password does not match user with username ${loginData.username}`,
      });
      } else {
        if(existingUsers.isVerified){
          const token = createToken(loginData.username, existingUsers.email)
          response({
            res,
            code: 200,
            token,
            message:`User is Logged in`,
            details: `A user with username ${loginData.username} has been logged in`,
          });    
        } else {
          response({
            res,
            code: 401,
            message:`User is not verified`,
            details: 'A user with username '+loginData.username+' is not yet verified. '+
            'Check your email address for verification message in order to verify account',
          });
        }
      }
    });
    } else {
      response({
        res,
        code: 404,
        message:`User not found`,
        details: `A user with username ${loginData.username} was not found`,
    });
    }
  });
}