const response = require('../../../utils/response');

module.exports = function(res, requestData, existingData, checkObject){
  let messageArr = []
  let msg = ''
  let msgMulpitle = ' is '

  existingData.forEach(function(user){
    for(let feild of Object.keys(checkObject)){
      if(requestData[feild] === user[feild]){
        checkObject[feild] = true
      }
    }
  })
  
  for (let key in checkObject){
    if(checkObject[key]){
      messageArr.push(key)
      if(messageArr.length > 1){
        msgMulpitle = ' are '
        msg += ` and ${key}`
      } else{
        msg += key
      }
    }
  }
  response({
    res,
    code: 403,
    message: msg+ msgMulpitle+ 'already taken',
  });
}