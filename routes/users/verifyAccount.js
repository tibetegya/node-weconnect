const { Verification, User } = require('../../models')
const response = require('../../utils/response')

module.exports = function(req, res, next) {
  const { verifyId } = req.params
  Verification.findOne({ verifyId }, function(err, verifyAcc){
    if(!verifyAcc){
      response({
        res,
        code: 400,
        message: 'Invalid Verification',
        details: 'Invalid Verification, invalid verification token'
      });
    } else {
      if (verifyAcc.isUsed){
        response({
          res,
          code: 400,
          message: 'Expired Verification token'
        });
      } else {
        const { userId } = verifyAcc;
        let verifiedUser;
        User.findOneAndUpdate(
        { _id: userId },
        {
          isVerified: true,
          updatedAt: new Date()
        }, function(err, user){
          verifiedUser = user
        })
        verifyAcc.isUsed = true
        verifyAcc.updatedAt = new Date()
        verifyAcc.save(function(err){
          if(err){
            response({
              res,
              status: 500,
              message: 'There was an error Verifying your Account'
            });
          } else {
          response({
            res,
            message: 'User verifed, you can now log in',
            username: verifiedUser.username,
            isVerified: true
          })
          }
        });
      }
    }
  })
}