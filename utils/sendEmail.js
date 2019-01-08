const nodemailer = require('nodemailer');
const { emailOptions } = require('./constants')

module.exports = function({ from, to, subject, text,  }, cb){
  const {
    host,
    port,
    user,
    pass,
  } =  emailOptions;

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false,
    auth: {
        user,
        pass
      }
    });
  const recipient = from ? from : user
  const mailOptions = {
    from: recipient,
    to,
    subject,
    text
    };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      cb();
    }
  });
}