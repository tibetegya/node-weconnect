var jwt = require('jsonwebtoken');

const { secretKey } = require('../utils/constants')
const getToken = require('../utils/getToken')
const response = require('../utils/response')
const { Blacklist } = require('../models');

module.exports = function (req, res, next){
  const token = getToken(req);
  jwt.verify(token, secretKey, function(err, decoded){
    if(err){
      const{ name, message } = err
      response({
        res,
        code: 401,
        status: name,
        message
      })
    } else {
      Blacklist.findOne({ token }, function(err, badToken){
        if(badToken){
          response({
            res,
            code: 401,
            message: 'Bad Token, Login again to get a valid token'
          })
        } else {
          req.body = { ...req.body, currentUser: decoded }
          next();
        }
      })
    }
  });
}
