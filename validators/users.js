const Joi = require('joi');

const alphaNum = Joi.string().alphanum().min(3).max(100)
const name = Joi.string().min(3).max(30)
const longString = Joi.string().max(150)
const email = Joi.string().email({ minDomainAtoms: 2 })
const text = Joi.string().max(300)
const password = Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/)
const arr = Joi.array()

const registerSchema = Joi.object().keys({
  username: alphaNum.required(),
  firstName: name.required(),
  lastName: name.required(),
  profilePhoto: longString,
  email: email.required(),
  bio: text,
  password: password.required(),
  interests: arr,
})

const updateSchema = Joi.object().keys({
  username: alphaNum,
  firstName: name,
  lastName: name,
  profilePhoto: longString,
  email: email,
  bio: text,
  password: password,
  interests: arr,
})

const loginSchema = Joi.object().keys({
  username: longString.required(),
  password: longString.required()
})


module.exports = function(data, schemaType) {
  const schema = {
    register: registerSchema,
    update: updateSchema,
    login: loginSchema
  }
  return Joi.validate(data, schema[schemaType], { abortEarly:false },(err, value) => {
    if (err) {
      return { ...err, data, type: 'error' }
    } else {
      return { ...data, type: 'success' }
    }
  })
}