const Joi = require('joi');

const { userSchemas } = require('../requestSchemas')
const response = require('../utils/response');

module.exports = function (req, res, next) {
  let schemaType;
  let validMethod = false;
  for (method of [ 'put', 'post']){
    if (req.method.toLowerCase() === method){
      validMethod = true
    }
  }
  if(validMethod){
    for (route of  [ 'register', 'login', 'logout', 'update', 'reset' ]){
      if(req.originalUrl.includes(route)){
        schemaType = route;
      }
    }
    const validateData = Joi.validate(req.body, userSchemas[schemaType], { abortEarly:false },(err, value) => {
      const data = req.body;
      if (err) {
        return { ...err, data, type: 'error' }
      } else {
        return { ...data, type: 'success' }
      }
    })
    switch(validateData.type){
      case 'error':
      const invalidData = validateData.data;
      response({
          res,
          invalidData,
          code: 400,
          message:`Invalid request data bacause a ${validateData.name} has occured`,
          details: validateData.details,
      });
      break;
      case 'success':
        next();
    }
  } else{
    next();
  }
};
