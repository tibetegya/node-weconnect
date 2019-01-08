const { User, PasswordReset } = require('../../models');
const sendEmail =  require('../../utils/sendEmail');
const response = require('../../utils/response');
const getUuid = require('../../utils/getUuid')

const sendReset = function(feild, res, host){
  let elm = feild.username == undefined ? feild.email : feild.username
  User
  .findOne(feild, function(err, existingUser){
    if(!existingUser){
      response({
        res,
        code: 400,
        message:`User not found`,
        details: `User with ${elm} does not exist`,
    })
    } else {
      const resetId = getUuid(existingUser.username);
      const resetUrl = `http://${host}/auth/reset-password/${resetId}`
      sendEmail({
        to: existingUser.email,
        subject: 'Weconnect Reset Password',
        text: resetUrl
      }, function(){
        const newReset = new PasswordReset({
          userId: existingUser._id,
          resetId,
          isUsed: false,
        })
        newReset.save(function(err){
          if(err){
            console.error('error in creating a reset password')
          } else{
            response({
              res,
              code: 200,
              message:`Email with password reset options has been sent`,
              details: `Check your email address for reset options`,
          })
          }
        })

      })
    }
  });
}
module.exports = function(req, res, next){
  const { body: { username, email }, headers: { host } } = req;
  if(username){
    sendReset({ username }, res, host)
  } else{
    sendReset({ email }, res, host)
  }

};
