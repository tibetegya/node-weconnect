const sendEmail = require('../../../utils/sendEmail')
const getUuid = require('../../../utils/getUuid')
const Verification = require('../../../models/accountVerify')

module.exports = function(user, host){
  const verifyId = getUuid(user.username);
  const verifyUrl = `http://${host}/auth/verify-account/${verifyId}`;
  let fromEmail;

  const newVerification = new Verification({
    userId: user.id,
    verifyId,
    isUsed: false,
  })
  newVerification.save(function(err){
    if(err){
      console.error('error in creating a verification')
    }
  })
  sendEmail({
    from: fromEmail,
    to: user.email,
    subject: 'Acount Verification',
    text: verifyUrl
  })
}
