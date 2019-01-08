const { User } = require('../../models');
const { userReturnFeilds } = require('../../utils/constants');
const createNewUser = require('./helpers/createNewUser');
const checkDuplicates = require('./helpers/checkDuplicates');
const sendVerificationEmail = require('./helpers/sendVerifycationEmail')

module.exports = function(req, res, next) {
  User
  .find({},
    userReturnFeilds).
  or([{username: req.body.username}, { email: req.body.email }]).
  exec(function(err, existingUsers){
    if(existingUsers.length < 1){
      createNewUser(res, req.body, req.headers.host, sendVerificationEmail);
    } else {
      const checkObject = { username: false, email: false }
      checkDuplicates(res, req.body, existingUsers, checkObject)
    }
  });
}