const uuid = require('uuid/v5');
const { appId } = require('./constants') 

module.exports = function(payload){
  return uuid(`${payload}`+`${new Date()}`, appId);
}