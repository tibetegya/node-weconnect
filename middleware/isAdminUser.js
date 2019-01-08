
const response = require('../utils/response')
const User = require('../models/user')

module.exports = function (req, res, next){
  const { body : { currentUser } } = req;

  User.findOne({ username: currentUser.user }, function(err, user){
    if(user){
      if(!user.isAdmin){
        const msg = 'You are not authorised to access this endpoint'
        response({
          res,
          code: 401,
          message: msg,
          details: msg+ ', only admins allowed'
        })
      } else {
        next()
      }
    }
  })
}
