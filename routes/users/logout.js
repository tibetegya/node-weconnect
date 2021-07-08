const jwt = require('jsonwebtoken');

const getToken = require('../../utils/getToken')
const response = require('../../utils/response')
const blacklistToken  = require('./helpers/blacklistToken')

module.exports = function(req, res, next){
  token = getToken(req);
  if(token){
    blacklistToken(token);
      response({
        res,
        code: 200,
        message: 'You have successfully logged out'
      })
  } else {
    response({
      res,
      code: 401,
      message: 'You are not logged in'
    })
  }
}