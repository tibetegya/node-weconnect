const jwt = require('jsonwebtoken');
const { secretKey } = require('./constants')

module.exports = function(username, email){
  return jwt.sign({ 
    user: username,
    email: email }, secretKey);
}